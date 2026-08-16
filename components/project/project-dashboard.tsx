import React from 'react'
import { CommentProps, ProjectProps } from "@/utils/types"
import { Task, Activity } from "@prisma/client"
import { ProjectHeader } from './project-header';
import { Card } from '../ui/card';
import { TaskDistributionCard } from './task-distribution-chart';
import { ActivityFeed } from './activity-feed';
import { CommentList } from './comment-list';
import { CircleProgress } from './circle-progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


interface ProjectDashboardProps {
  project: ProjectProps;
  tasks: {
    completed: number;
    inProgress: number;
    overdue: number;
    total: number;
    todo: number;
    items: Task[];
  };
  activities: Activity[]
  totalWorkspaceMembers: number;
  comments: CommentProps[];

}
export const ProjectDashboard = ({
  project,
  tasks,
  activities,
  totalWorkspaceMembers,
  comments
}: ProjectDashboardProps) => {
  return (
    <div className='flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0'>
      <ProjectHeader project={project as unknown as ProjectProps} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
        <Card className='p-4 bg-emerald-50 dark:bg-emerald-950/30'>
          <CircleProgress
            title="Task Completed"
            value={(tasks.completed / tasks.total) * 100}
            subTitle={`${tasks.completed}/${tasks.total} tasks`}
            variant="success"
          />
        </Card>
        <Card className='p-4 bg-sky-50 dark:bg-sky-950/30'>
          <CircleProgress
            title="In Progress "
            value={(tasks.inProgress / tasks.total) * 100}
            subTitle={`${tasks.inProgress} tasks ongoing`}
            variant="inProgress"
          />
        </Card>
        <Card className='p-4 bg-orange-50 dark:bg-orange-950/30'>
          <CircleProgress
            title="Overdue"
            value={(tasks.overdue / tasks.total) * 100}
            subTitle={`${tasks.overdue} overdue tasks`}
            variant="warning"
          />
        </Card>
        <Card className='p-4 bg-purple-50 dark:bg-purple-950/30'>
          <CircleProgress
            title="Team Members"
            value={project.members.length}
            subTitle={`${project.members.length} members`}
            variant="default"
          />
        </Card>
      </div>

      <div className='flex w-full justify-between gap-5'>

        <div className='w-full'>
          <TaskDistributionCard tasks={tasks} />
          <Card className="p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-sm font-medium">Team Members</h3>

              <div className=" flex flex-wrap space-x-2">
                {project?.members?.map((member) => (
                  <Avatar
                    key={member.id}
                    className="size-9 2xl:size-10 border-2 border-background shadow"
                  >
                    <AvatarImage src={member?.user.image || undefined} />
                    <AvatarFallback className="text-sm 2xl:text-base">
                      {member.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className='grid grid-cols-1 gap-4 w-full'>
          <Card className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Recent Activity</h3>
            <ActivityFeed activities={activities.slice(0, 5)} />
          </Card>
          <Card className='p-4'>
            <h3 className='text-lg font-semibold mb-4'>Recent Comments</h3>
            <CommentList comments={comments.slice(0, 5)} />
          </Card>
        </div>
      </div>



    </div>
  )
}

export default ProjectDashboard