
export type Task = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
};

export type TaskResult = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  created_by: number;
  assigned_to: number;
};
