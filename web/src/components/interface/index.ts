export interface SubmissionResult {
  source_code: string;
  language_id: number;
  compiler_options?: string;
  command_line_arguments?: string;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit: number;
  cpu_extra_time: number;
  wall_time_limit: number;
  memory_limit: number;
  stack_limit?: number;
  max_processes_and_or_threads?: number;
  enable_per_process_and_thread_time_limit?: boolean;
  enable_per_process_and_thread_memory_limit?: boolean;
  max_file_size?: number;
  redirect_stderr_to_stdout?: boolean;
  enable_network?: boolean;
  number_of_runs?: number;
  additional_files?: string;
  callback_url?: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  exit_code?: number;
  exit_signal?: number;
  status?: any;
  created_at?: Date;
  finished_at?: Date | null;
  token?: string;
  time?: number;
  wall_time?: number;
  memory?: any;
}

import { User } from "firebase/auth";
import { DEFAULT_LANGUAGE, DEFAULT_THEME } from "../constants";
export type Language = (typeof DEFAULT_LANGUAGE)[number];
export type Theme = (typeof DEFAULT_THEME)[number];

export interface CompileResponse {
  error: string;
  result: any;
}

export interface Response {
  success: boolean;
  error?: string;
  result?: SubmissionResult;
}

export interface CodeChange {
  delta: string;
  range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  };
}

export interface Group {
  id: string;
  members: string[];
  messages: Message[];
  sourceCode: string;
  createdAt: string;
  membersInfo: User[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export type ShapeType = "rectangle" | "circle" | "text" | "freehand";
export type ToolType = "pencil" | "eraser" | "rectangle" | "circle" | "text" | "select";

export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
  points?: Point[];
}

import { RgbaColor } from 'react-colorful';

// export type Shape = 'line' | 'circle' | 'rect' | 'image';
export type CtxMode = 'eraser' | 'draw' | 'select';

export interface CtxOptions {
  lineWidth: number;
  lineColor: RgbaColor;
  fillColor: RgbaColor;
  shape: Shape;
  mode: CtxMode;
  selection: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}

export interface Move {
  circle: {
    cX: number;
    cY: number;
    radiusX: number;
    radiusY: number;
  };
  rect: {
    width: number;
    height: number;
  };
  img: {
    base64: string;
  };
  path: [number, number][];
  options: CtxOptions;
  timestamp: number;
  id: string;
}


export interface Result {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  memoryUsage?: number;
}