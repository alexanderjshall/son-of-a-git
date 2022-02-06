import simpleGit from "simple-git";

export default async function pushCommand() {
    try {
        simpleGit().push();
    } catch {
        console.error("😢 Failed to push branch to remote.");
    }
}