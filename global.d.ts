declare module 'swiftcode' {
  /**
   * 创建模板文件
   * @param fileName - 要创建的文件名
   * @param tips - 创建完成后显示的提示信息
   */
  export function createTemplate(fileName: string, tips: string): void

  /**
   * 获取包版本号
   * @returns {string} package.json 中的版本号
   */
  export function getPackageVersion(): string
}

declare module 'swiftcode/template.js' {
  const template: any
  export default template
}
