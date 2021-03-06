/* ns__file unit: static-command, comp: pounce.ts */
/*
* This file is autogenerated using the easy-oclif-cli template with ns-flip. Please view
* the instructions for this code base at meta/instructions.md.
*/

/* ns__start_section imports */
import {Command, flags} from '@oclif/command'

/* ns__custom_start customImports */
import {createNewTemplate} from '../custom/templates/new/createNewTemplate'
import {printInstructionsForNewTemplate} from '../custom/templates/new/printInstructionsForNewTemplate'
const {resolveDir} = require('magicalstrings').resolveDir
const {dingKats} = require('magicalstrings').constants.types
const {suffixes} = require('magicalstrings').constants
import {removeCodeModelDiscrepancies} from '../custom/templates/discrepancies/removeCodeModelDiscrepancies'

/* ns__custom_end customImports */
/* ns__end_section imports */

export default class Pounce extends Command {
static description = `specify a model code base and generate a template to build it
`

static examples = [
/* ns__custom_start examples */
// replace this when you change your command!! To regenerate fresh, first delete everything between the squre brackets.
  `$ copykat pounce sampleModel -t sampleTemplateDir
`,
/* ns__custom_end examples */
]

static flags = {
  help: flags.help({char: 'h'}),
  templateDir: flags.string({
    char: 't',
    description: 'path to the generator that you will build',
  }),
}

static args = [
  {
    name: 'model',
    description: 'path to a model code base from which you will generate your template',
    required: true,
  },
]

async run() {
  const {args, flags} = this.parse(Pounce)

  const {model} = args

  const {templateDir} = flags
  /* ns__custom_start run */
  let finalTemplateDir = ''
  try {
    finalTemplateDir = await createNewTemplate(resolveDir(model), resolveDir(templateDir))
    this.log(printInstructionsForNewTemplate(finalTemplateDir))
  } catch (error) {
    this.log(dingKats.ERROR + ` cannot create template: ${error}`)
    return
  }

  const code = finalTemplateDir + suffixes.SAMPLE_DIR
  const newModel = finalTemplateDir + suffixes.MODEL_DIR

  try {
    await removeCodeModelDiscrepancies(
      finalTemplateDir, code, newModel
    )
  } catch (error) {
    this.log(dingKats.ERROR + ` cannot compare directories: ${error}`)
  }

  /* ns__custom_end run */
}
}
