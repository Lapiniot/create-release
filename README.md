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