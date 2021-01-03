import {dingKats} from '../../shared/constants/types/dingKats'

const inquirer = require('inquirer')
const path = require('path')

interface TemplateDefaults {
  model?: string;
  templateDir?: string;
  templateName?: string;
  category?: string;
  customDir?: string;
  fileFilter?: string;
}

export async function newTemplateQuestions(defaults: TemplateDefaults) {
  const {model, templateDir, category, customDir, fileFilter} = defaults
  let templateName = defaults.templateName
  if (!templateName && templateDir)
    templateName = path.basename(templateDir)

  const questions = [
    {
      type: 'input',
      name: 'nsDir',
      message: 'What is the template directory?',
      default: process.cwd(),
      when: () => !templateDir,
    },
    {
      type: 'input',
      name: 'original',
      message: 'Please enter the full path to a directory of your sample code base' +
        ' to serve as a model for your template',
      when: () => !model,

      // default: '~/projects/myApp',
    },
    {
      type: 'input',
      name: 'templateName',
      message: 'What would you like to name your template? ' +
        '(No spaces!  Do not use the words \'ns\' or \'template\', because ns-flip will add those anyway.' +
        ' You can always remove them later.)',
      default: 'practice',
      when: () => !templateName,
    },
    {
      type: 'input',
      name: 'category',
      message: 'what keywords would describe the *type* of file generated by the template? ' +
        'Mention any framework or other category that would help to classify the template.',
      // default: 'ns-template-first',
      when: () => !category,
    },
    {
      type: 'input',
      name: 'customDir',
      message: 'What would you like for your `custom` directory, where code bases can store custom files?',
      default: 'src/custom',
      when: () => !customDir,

    },
    {
      type: 'input',
      name: 'fileFilter',
      message: 'What would you like for your intial glob file filter, to describe the files that your users' +
        'will be able to modify?  You can have more than one pattern like this: \'+(*.{js,jsx,md}|.eslintrc)\'',
      default: '*.{js,jsx,ts,tsx,md,yml}',
      when: () => !fileFilter,
    },
  ]

  let response: any = {}

  // eslint-disable-next-line no-console
  console.log(dingKats.SMILING + ' Welcome to copykat! Please answer the following questions:')
  try {
    await inquirer
    .prompt(questions)
    .then((answers: any) => {
      response = answers
    })
  } catch (error) {
    throw new Error(dingKats.POUTING + `problem asking question: ${error}`)
  }

  if (model) response.original = model
  const returned = {...response, ...defaults}
  return returned
}
