import fsp from "fs/promises";
import { exec } from "child_process";
import { Worker } from "../types/worker.js";
import { ConnectQAError } from "../utils/connectQA-error.js";
import { ErrorCode } from "../types/error.js";
import { Log } from "../utils/logger.js";
import { CodeParams } from "../types/code-params.js";

const _logger = new Log();

export class ConnectQAWorker implements Worker {
  public async executeCode(headed: boolean): Promise<boolean> {
    try {
      _logger.info("Executing tests...", true);
      return new Promise((resolve, reject) => {
        exec(`npm run ${headed ? "exec-headed" : "exec"}`, (error: any) => {
          if (error) {
            reject(false);
            _logger.error(error.message);
            throw new ConnectQAError({
              code: ErrorCode.FAILED_TEST_EXECUTION,
              params: {
                error,
              },
            });
          } else {
            resolve(true);
            this.clearTargetFile();
          }
        });
      });
    } catch (error) {
      throw new ConnectQAError({
        code: ErrorCode.FAILED_TEST_EXECUTION,
        params: {
          error,
        },
      });
    }
  }

  public async writeCodeToTargetFile(code: CodeParams) {
    try {
      fsp
        .writeFile("target/target.spec.js", this.generateTestCode(code))
        .catch((error: any) => {
          _logger.error(error.message);
          throw new ConnectQAError({
            code: ErrorCode.WRITING_CODE_ERROR,
            params: {
              error,
            },
          });
        });
    } catch (error) {
      throw new ConnectQAError({
        code: ErrorCode.WRITING_CODE_ERROR,
        params: {
          error,
        },
      });
    }
  }

  public async clearTargetFile(): Promise<void> {
    try {
      await fsp.writeFile("target/target.spec.js", "");
    } catch (err: any) {
      _logger.error(err.message);
    }
  }

  private generateTestCode(code: CodeParams) {
    let testCode = `import { test, expect } from "@playwright/test";test("${code.testName}", async ({ page }) => {`;

    for (const action of code.actions) {
      if (action.actionType === "goto") {
        testCode += ` await page.goto("${action.url}");`;
      } else if (action.actionType === "click") {
        testCode += ` await page.getByRole("link", { name: "${action.name}" }).click();`;
      }
    }

    for (const assertion of code.assertions) {
      if (assertion.assertionType === "toHaveURL") {
        testCode += ` await expect(page).toHaveURL(${assertion.expected});`;
      }
    }

    testCode += "});\n";
    return testCode;
  }
}
