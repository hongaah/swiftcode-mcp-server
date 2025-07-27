# Swiftcode MCP Server

## Project Overview

Swiftcode MCP Server is a Model Context Protocol (MCP) server that provides automatic code generation capabilities for modern web development. This server focuses on generating TypeScript API clients from Swagger/OpenAPI specifications and Vue.js components for rapid frontend development.

## Features

- **Swagger/OpenAPI to TypeScript**: Automatically generate TypeScript API clients from Swagger specifications
- **Vue Component Generation**: Create complete Vue 3 list pages with filters, tables, and pagination
- **Template Management**: Access and utilize pre-built code generation templates
- **Code Validation**: Validate Swagger/OpenAPI specifications before generation
- **Mock Data Generation**: Optionally generate mock data for testing purposes

## Tools

### 1. `generate_api_client`
Generate TypeScript API client from Swagger/OpenAPI specification.

**Parameters:**
- `swagger_url` (string): URL to Swagger/OpenAPI JSON specification
- `swagger_content` (string): Direct Swagger/OpenAPI JSON or YAML content
- `output_format` (string): Output format ("typescript" or "javascript", default: "typescript")
- `include_types` (boolean): Whether to generate TypeScript type definitions (default: true)

**Example:**
```javascript
{
  "swagger_url": "https://api.example.com/swagger.json",
  "output_format": "typescript",
  "include_types": true
}
```

### 2. `generate_vue_list`
Generate Vue list page component with table and filters.

**Parameters:**
- `page_config` (object): Page configuration with Chinese/English names and features
- `filters` (object): Filter configuration for search functionality
- `table_columns` (object): Table column definitions
- `generate_mock` (boolean): Whether to generate mock data (default: false)

**Example:**
```javascript
{
  "page_config": {
    "cn": "用户管理",
    "en": "userManagement",
    "select": true,
    "btn": ["新增", "删除"]
  },
  "filters": {
    "用户名": "input",
    "状态": "select",
    "创建时间": "daterange"
  },
  "table_columns": {
    "用户名": "text",
    "邮箱": "text",
    "创建时间": "time",
    "操作": {
      "type": "operate",
      "render": ["编辑", "删除"]
    }
  }
}
```

### 3. `get_templates`
Get available code generation templates.

**Parameters:**
- `template_type` (string): Type of templates to retrieve ("vue-list", "api-client", or "all")

### 4. `validate_swagger`
Validate Swagger/OpenAPI specification.

**Parameters:**
- `swagger_url` (string): URL to Swagger/OpenAPI specification
- `swagger_content` (string): Direct Swagger/OpenAPI content

## Prompts

The server provides several helpful prompts:

- **`swiftcode_getting_started`**: Introduction guide to Swiftcode features
- **`swagger_to_typescript`**: Detailed guide for Swagger to TypeScript conversion
- **`vue_component_generation`**: Vue component generation guide and best practices
- **`troubleshooting`**: Common issues and troubleshooting guide

## Supported Technologies

### Frontend Frameworks
- Vue 3 with Composition API
- Element Plus UI components
- TypeScript support

### API Specifications
- Swagger 2.0
- OpenAPI 3.0+
- JSON and YAML formats

### Generated Code Features
- TypeScript interfaces and types
- Vue 3 reactive components
- Element Plus form and table components
- Pagination and filtering
- Mock data generation

## Setup

### NPX (Recommended)

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "Swiftcode": {
      "command": "npx",
      "args": [
        "-y",
        "@swiftcode/mcp-server"
      ],
      "env": {
        "SWIFTCODE_OUTPUT_DIR": "./generated"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Local Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start

# For development with hot reload
npm run watch
```

### Docker

```bash
# Build Docker image
docker build -t swiftcode-mcp .

# Run container
docker run -it swiftcode-mcp
```

## Usage Examples

### Generate API Client from Swagger URL

```javascript
// Use the generate_api_client tool
{
  "swagger_url": "https://petstore.swagger.io/v2/swagger.json",
  "output_format": "typescript",
  "include_types": true
}
```

### Generate Vue List Component

```javascript
// Use the generate_vue_list tool
{
  "page_config": {
    "cn": "产品列表",
    "en": "productList",
    "select": true,
    "top": true,
    "btn": ["新增产品", "批量删除"]
  },
  "filters": {
    "产品名称": "input",
    "分类": "select",
    "价格范围": {
      "type": "daterange",
      "range": [1, "m"]
    }
  },
  "table_columns": {
    "选择": "select",
    "序号": "index",
    "产品名称": "text",
    "价格": "text",
    "创建时间": "date",
    "操作": {
      "type": "operate",
      "fixed": "right",
      "render": ["编辑", "删除", "查看详情"]
    }
  },
  "generate_mock": true
}
```

## Filter Types

- `input`: Text input field
- `select`: Dropdown selection
- `daterange`: Date range picker
- `datetime`: Date and time picker
- `date`: Date picker only
- `datetimerange`: Date and time range picker

## Table Column Types

- `text`: Plain text column
- `time`/`date`: Formatted date/time column
- `select`: Selection checkbox column
- `index`: Auto-incrementing index column
- `operate`: Action buttons column
- `option`: Enum/status column
- `link`: Clickable link column
- `tag`: Tag/badge column

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions, issues, or feature requests, please visit the [GitHub repository](https://github.com/hongaah/swiftcode) or contact the development team.

