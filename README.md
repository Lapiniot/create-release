# Create Release GitHub Action

This GitHub Action automates the process of creating a new release in your repository. It can be triggered on push, pull request merges, or manually via workflow dispatch. The action generates a release based on your repository's tags.

## Usage Example

Below is an example of how to use the **Create Release GitHub Action** in your workflow file:

```yaml
name: Publish Release

on:
    workflow_dispatch:

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout repository
                uses: actions/checkout@v4

            # Add your build and test steps here

            - name: Create Release
                uses: Lapiniot/create-release@master
                id: create_release
                env: 
                    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
                with:
                    name: Release ${{ github.ref }}
                    tag_name: ${{ github.ref }}
                    body: |
                        ## Changes in this release
                        - Feature 1
                        - Bug Fixes
                    draft: false
                    prerelease: false
                    generate_release_notes: false
```
## Inputs
- `name` : (required) The name of the release.
- `tag_name` : (required) The tag name for the release.
- `body`: (required) The body text for the release notes.
- `draft`: (optional) Boolean to indicate if the release should be a draft.
- `prerelease`: (optional) Boolean to indicate if the release is a prerelease.
- `generate_release_notes`: (optional) Boolean to indicate if release notes should be generated automatically.
- `make_latest`: (optional) Set the release as the latest release.

## Outputs
- `id`: The ID of the created release.
- `html_url`: The URL of the created release.
- `upload_url`: The URL to upload assets to the release.

## Environment Variables
- `GITHUB_TOKEN`: A token to authenticate with the GitHub API. This is usually provided via GitHub Secrets.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details