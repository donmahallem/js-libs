import { cp } from '@actions/io';
import { Clone, Commit, Cred, Index, Oid, Reference, Remote, Repository, Signature, StatusFile } from 'nodegit';
import { promises as fsp } from 'fs';
import { FinalInputFile } from '../types';
import { join } from 'path';

export const syncFiles = async (gistId: string, files: FinalInputFile[], prune?: boolean): Promise<void> => {
    const tempDir: string = await fsp.mkdtemp('gist-');
    const repo: Repository = await Clone.clone(`donmahallem@github.com:${gistId}.git`, tempDir, {
        fetchOpts: {
            callbacks: {
                credentials: (url: string, user: string) => {
                    console.info(url, user, JSON.stringify(Cred.sshKeyFromAgent("git")));
                    return Cred.sshKeyFromAgent("donmahallem");
                },
            }
        }
    });
    for (let f of files) {
        const destPath: string = join(tempDir, f.filename);
        await cp(f.source, destPath, { force: true, recursive: false });
    }
    console.log(tempDir, await repo.getCurrentBranch())
    const index: Index = await repo.refreshIndex(); // read latest
    const gitFiles: StatusFile[] = await repo.getStatus(); // get status of all files
    for (let gitFile of gitFiles) {
        if (!gitFile.isIgnored()) {
            continue;
        }
        if (!gitFile.isModified() && prune === true) {
            await index.removeByPath(gitFile.path());
        } else {
            await index.addByPath(gitFile.path());
        }
    }
    await index.write(); // flush changes to index
    console.log("Remotes", await (await repo.getRemotes()).map((rem: Remote): string => rem.name()));
    const changes: Oid = await index.writeTree(); // get reference to a set of changes
    const head: Oid = await Reference.nameToId(repo, "HEAD"); // get reference to the current state
    const parent: Commit = await repo.getCommit(head); // get the commit for current state
    const author: Signature = Signature.now("donmahallem", "donmahallem@users.noreply.github.com"); // build auth/committer
    const committer: Signature = Signature.now("donmahallem", "donmahallem@users.noreply.github.com");
    // combine all info into commit and return hash
    const commitId: Oid = await repo.createCommit("HEAD", author, committer, "message", changes, [parent]);
    console.log('commitId', commitId);
    const remote = await repo.getRemote('origin');
    const localBranch = await repo.getCurrentBranch();
    const remoteRef: string = `${localBranch.name()}:${localBranch.name()}`;
    console.log('current branch', localBranch.name(), remoteRef);
    const pushResult = await remote.push([remoteRef], {
        callbacks: {
            credentials: (url: string, user: string) => {
                console.info(url, user, JSON.stringify(Cred.sshKeyFromAgent("donmahallem")));
                return Cred.sshKeyFromAgent("donmahallem");
            },
        }
    });
    console.log(pushResult);
}
