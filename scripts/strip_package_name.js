const matchString = 'refs/tags/';

let input = process.argv[2];
if (input.startsWith(matchString)) {
    input = input.slice(matchString.length);
}
const items = input.split("@");
const packagename = items.slice(0, Math.max(items.length - 1, 1)).join("@");
process.stdout.write('::set-output name=PACKAGE_NAME::' + packagename);
process.stdout.write('\n');
process.stdout.write('::set-output name=PACKAGE_NAME_SUFFIX::' + packagename.split("/")[1]);
