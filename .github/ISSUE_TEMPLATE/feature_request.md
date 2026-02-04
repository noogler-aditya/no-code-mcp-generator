---
name: Feature request
description: Suggest a feature or enhancement
labels: ["enhancement"]
body:
  - type: textarea
    id: problem
    attributes:
      label: Problem
      description: What problem does this solve?
    validations:
      required: true
  - type: textarea
    id: solution
    attributes:
      label: Proposed solution
      description: Describe the desired behavior.
    validations:
      required: true
  - type: textarea
    id: context
    attributes:
      label: Additional context
      description: Add mockups, examples, or references.
