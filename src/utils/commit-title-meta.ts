import { CommitTitles } from "./commit-titles.js";

export interface CommitMeta {
    type: CommitTitles;
    emoji: string;
    description: string;
}

export const supportedCommitMeta: CommitMeta[] = [
    {
        type: CommitTitles.FIX,
        emoji: "🛠",
        description: "A fix for an issue"
    },
    {
        type: CommitTitles.FEAT,
        emoji: "❇",
        description: "A new consumable feature"
    },
    {
        type: CommitTitles.HOTFIX,
        emoji: "🚑",
        description: "A temporary fix for a critical issue"
    },
    {
        type: CommitTitles.TESTS,
        emoji: "🧪",
        description: "Add to or change automated tests"
    },
    {
        type: CommitTitles.CHORE,
        emoji: "☑",
        description: "A common or trivial task"
    },
]

export const commitMetaToInquirerChoice = (meta: CommitMeta) => {
    return {
        "value": `${meta.emoji} ${meta.type}`,
        "name": `${meta.type.toUpperCase()} - ${meta.description}`,
        "short": meta.type.toUpperCase()
    }
};