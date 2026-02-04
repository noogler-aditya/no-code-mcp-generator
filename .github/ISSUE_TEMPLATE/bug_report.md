---
name: Bug report
description: Report a problem in the MCP generator
labels: ["bug"]
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: What went wrong?
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: Provide steps so we can reproduce the issue.
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
    validations:
      required: true
  - type: textarea
    id: logs
    attributes:
      label: Logs / Screenshots
      description: Add any relevant logs or screenshots.
      render: shell
  - type: input
    id: version
    attributes:
      label: Version / Commit
      description: Output of `git rev-parse --short HEAD` if available
