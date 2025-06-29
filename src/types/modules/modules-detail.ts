import { PostTest } from "../test/post-test";
import { PreTest } from "../test/pre-test";
import { Modules } from "./modules";

export interface SubModules {
  id: string;
  module_id: string;
  name: string;
  file_path: string;
  video_url: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface ModulesDetail {
  module: Modules;
  pre_test: PreTest[];
  post_test: PostTest[];
  sub_modules: SubModules[];
}
