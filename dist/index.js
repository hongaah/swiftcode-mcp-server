import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ListPromptsRequestSchema, ErrorCode, McpError, } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Swagger2InterfaceOutput } from '@swiftcode/api';
import path from "node:path";
const TOOLS = [
    {
        name: "generate_api_client",
        description: "Generate TypeScript API client from Swagger/OpenAPI specification",
        inputSchema: {
            type: "object",
            properties: {
                source: {
                    type: "string",
                    description: "URL or JSON file path. Examples: For full path: '//user/file.json', For file only: 'file.json' returns 'file json'. URLs should start with '/' for proper routing."
                },
                dir: {
                    type: "string",
                    description: "workspace dir"
                }
            },
            required: ["source", "dir"],
        }
    },
];
const PROMPTS = [
    {
        name: "swiftcode_getting_started",
        description: "Swiftcode 代码生成工具入门指南",
        arguments: [
            {
                name: "feature_type",
                description: "要了解的功能类型 (api-generation, vue-components, templates)",
                required: false
            }
        ]
    },
    {
        name: "swagger_to_typescript",
        description: "Swagger API 转 TypeScript 接口的详细指南",
        arguments: [
            {
                name: "api_type",
                description: "API 类型 (rest, graphql, rpc)",
                required: false
            }
        ]
    },
];
class SwiftcodeMCP {
    server;
    constructor() {
        this.server = new Server({
            name: "swiftcode-mcp",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {
                    listChanged: true,
                },
                prompts: {
                    listChanged: true,
                },
            },
        });
        this.setupHandlers();
        this.setupErrorHandling();
    }
    setupErrorHandling() {
        this.server.onerror = (error) => {
            console.error("[MCP Error]", error);
        };
        process.on('SIGINT', async () => {
            await this.stop();
            process.exit(0);
        });
    }
    setupHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: TOOLS
        }));
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => this.handleToolCall(request.params.name, request.params.arguments ?? {}));
        // List available prompts
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
            prompts: PROMPTS
        }));
    }
    /**
     * Handles tool call requests
     */
    async handleToolCall(name, args) {
        switch (name) {
            case "generate_api_client": {
                const { source, dir } = args;
                // 判断 source 是否是 文件路径
                const isFilePath = source.startsWith('/');
                const filePath = isFilePath ? `/${source}` : source;
                try {
                    const result = await Swagger2InterfaceOutput({
                        source: filePath,
                        isDev: false,
                        dir: path.join(dir, 'apis')
                    });
                    return {
                        content: [{
                                type: 'text',
                                text: 'API client generated successfully. Please check the apis directory. output file list'
                            }]
                    };
                }
                catch (error) {
                    console.error('Error while generating API client:', error);
                    throw new McpError(ErrorCode.InternalError, 'Failed to generate API client', {
                        code: ErrorCode.InternalError,
                        message: 'Failed to generate API client'
                    });
                }
            }
            default: {
                throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`, {
                    code: ErrorCode.MethodNotFound,
                    message: `Tool ${name} not found`
                });
            }
        }
    }
    /**
     * Starts the server
     */
    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
    }
    /**
     * Stops the server
     */
    async stop() {
        try {
            await this.server.close();
        }
        catch (error) {
            console.error('Error while stopping server:', error);
        }
    }
}
const server = new SwiftcodeMCP();
// Main execution
async function main() {
    try {
        console.log('Swiftcode MCP Server starting...');
        await server.start();
    }
    catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error("Fatal server error:", error);
    process.exit(1);
});
process.on('SIGINT', async () => {
    await server.stop();
    process.exit(0);
});
