# Projects Data

This directory contains the project data for the portfolio website.

## Adding New Projects

To add a new project, simply edit the `projects.json` file and add a new project object with the following structure:

```json
{
  "id": 6,
  "title": "Your Project Title",
  "description": "A brief description of your project and what it does.",
  "technologies": ["Technology1", "Technology2", "Technology3"],
  "githubUrl": "https://github.com/yourusername/your-repo",
  "liveUrl": "https://your-project.vercel.app",
  "status": "completed",
  "featured": false
}
```

### Field Descriptions

- **id**: Unique identifier for the project (increment from the last project)
- **title**: Project name
- **description**: Brief description of what the project does
- **technologies**: Array of technologies used (strings)
- **githubUrl**: (Optional) Link to the GitHub repository
- **liveUrl**: (Optional) Link to the live demo
- **status**: One of: "completed", "in-progress", "planned"
- **featured**: Boolean - if true, shows a "Featured" badge on the project card

### Status Types

- **completed**: Project is finished and deployed
- **in-progress**: Currently being worked on
- **planned**: Future project or in planning phase

### Featured Projects

Set `featured: true` to highlight important projects with a star badge.

## Example

```json
{
  "id": 6,
  "title": "NFT Marketplace",
  "description": "A full-stack NFT marketplace built with React and Solidity, featuring minting, trading, and auction functionality.",
  "technologies": ["React", "Solidity", "Web3.js", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/rahatcodes/nft-marketplace",
  "liveUrl": "https://nft-marketplace.vercel.app",
  "status": "completed",
  "featured": true
}
```

The website will automatically pick up changes to this file when you restart the development server.
