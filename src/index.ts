import { getBooleanInput, getInput, setFailed, setOutput, } from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
    try {
        const token = process.env.GITHUB_TOKEN!;
        const client = getOctokit(token);

        const { repo: { owner, repo }, sha } = context;

        const name = getInput('release-name', { required: true });
        const tag = getInput("tag-name", { required: true }).replace("refs/tags/", "");
        const body = getInput("body", { required: true });
        const prerelease = getBooleanInput("prerelease");
        const draft = getBooleanInput("draft");
        const generateReleaseNotes = getBooleanInput("generate-release-notes");
        const makeLatest = getInput("make-latest") as "true" | "false" | "legacy";

        const response = await client.rest.repos.createRelease({
            owner, repo, name, tag_name: tag, body, target_commitish: sha,
            prerelease, draft, generate_release_notes: generateReleaseNotes, make_latest: makeLatest
        });

        const { data: { id, html_url, upload_url } } = response;

        setOutput('id', id);
        setOutput('html-url', html_url);
        setOutput('upload-url', upload_url);
    } catch (error) {
        setFailed((error as Error).message);
    }
}

run();