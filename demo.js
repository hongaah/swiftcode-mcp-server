import { Template2ListOutput } from '@swiftcode/list'
import { createTemplate } from 'swiftcode'

async function testsfc() {
  try {
    await Template2ListOutput({
      // source: 'template.js',
      source: './template.js',
    })
  } catch (error) {
    console.error('Error while generating SFC files:', error)
  }
}
async function testsfctemplate() {
  try {
    createTemplate('templat22e.js', '下载转换列表的模板 template.js 成功')
  } catch (error) {
    console.error('Error while generating SFC files:', error)
  }
}

testsfctemplate()
// testsfc()
