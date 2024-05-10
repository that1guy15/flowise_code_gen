// Flowise custom tool to create a GitHub Gist using the GitHub API
// 'create_github_gist_CustomTool.json' is the custom tool JSON file that can be imported into Flowise
// Arguments:
//      GITHUB_API_KEY - Stored in Flowise as a secret
//      description - "short description of what the code does"
//      filename - "filename of the code based on context"
//      code_block - "code generated"

const fetch = require('node-fetch');
const url = 'https://api.github.com/gists';
const token = $vars.GITHUB_API_KEY;
const description = $description
const filename = $filename
const codeblock = $code_block

const body = {
  description: description,
  public: true,
  files: {
    [filename]: {
      content: codeblock
    }
  }
};

const options = {
	method: 'POST',
	headers: {
		'Authorization': `token ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',

    },
    body: JSON.stringify(body)
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
	return result;
} catch (error) {
	console.error(error);
	return '';
}