# Developer Maintenance Notes

* Pushing a version update
  * Change the contents of `version` to reflect the current version
  * Ensure that the current version is pushed to the `master` branch
  * Describe all changes in the changelog

* `git` best practices
  * When modifying dependencies, commit the `yarn.lock` file to improve install speed
  * When creating a branch, follow the naming convention: (feat | fix | chore | ci | docs)/branch-name
