export type Modules = {
  id: string;
  name: string;
  description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type ModuleContent = {
  id: string;
  sub_module_id: string;
  name: string;
  video_url: string;
  file_path: string;
  content: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type SubModules = {
  id: string;
  name: string;
  module_id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  module: Modules;
  module_contents: ModuleContent[];
};
