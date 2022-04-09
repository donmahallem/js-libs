import type { ExecutorContext } from '@nrwl/devkit';
export interface EchoExecutorOptions {
    textToEcho: string;
}
export default function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext): Promise<{
    success: boolean;
}>;
