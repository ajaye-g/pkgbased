import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  Tree,
  logger
} from '@nrwl/devkit';
import * as path from 'path';
import { ToolingGeneratorSchema } from './schema';

interface NormalizedSchema extends ToolingGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: ToolingGeneratorSchema
): NormalizedSchema {
  const normalizedName = names(options.name);
  return {
    ...options,
    projectName: normalizedName.fileName,
    projectRoot = `${getWorkspaceLayout(tree).libsDir}/${normalizedName.fileName}`,
  };
  // const name = names(options.name).fileName;
  // const name = names(options.name).fileName;
  // const projectDirectory = options.directory
  //   ? `${names(options.directory).fileName}/${name}`
  //   : name;
  // const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  // const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  // const parsedTags = options.tags
  //   ? options.tags.split(',').map((s) => s.trim())
  //   : [];

  // return {
  //   ...options,
  //   projectName,
  //   projectRoot,
  //   projectDirectory,
  //   parsedTags,
  // };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  //  


  const templateOptions = {
    packageName: '',
    template:'',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: ToolingGeneratorSchema) {

  const normalizedOptions = normalizeOptions(tree, options);
 
  addFiles(tree, options: normalizedOptions);
  await formatFiles(tree);
}
