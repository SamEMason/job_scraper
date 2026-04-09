import Config from '#src/Config.ts';
import type { DeptFiltersData } from '#src/types.ts';
import fs from 'fs/promises';
import path from 'path';

export class DeptFilterStore {
  public async save(filterData: DeptFiltersData) {
    const filePath = Config.DEPT_UID_JSON_FILEPATH;
    const dir = path.dirname(filePath);

    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(
      Config.DEPT_UID_JSON_FILEPATH,
      JSON.stringify(filterData, null, 2),
      'utf-8'
    );
  }

  public async merge() {}

  public async load() {
    try {
      const raw = await fs.readFile(Config.DEPT_UID_JSON_FILEPATH, 'utf-8');
      return JSON.parse(raw);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return {
          paramKey: '',
          filters: {} as DeptFiltersData['filters'],
        };
      } else {
        console.error(
          `Could not load file ${Config.DEPT_UID_JSON_FILEPATH}: ${err}`
        );
        throw err;
      }
    }
  }
}
