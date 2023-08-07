export interface TaskList {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: Priority;
    completed: boolean;
    tasks: Task[];
}

enum Priority {
    low,
    medium,
    high
}

export interface Task {
    id: number;
    description: string;
    dueDate?: Date;
    completed: boolean;
}

// Assuming you already have the TaskList and Priority interfaces defined in your code

export const LISTS: TaskList[] = [
    {
        id: 1,
        title: 'Mandag',
        description: 'Hvad skal jeg lave om mandagen',
        dueDate: new Date('2023-08-07'), // Make sure to use the correct date format (YYYY-MM-DD)
        priority: Priority.low,
        completed: false,
        tasks: [
            {
                id: 1,
                description: 'Købe ind',
                dueDate: new Date('2023-08-07'),
                completed: false,
            },
            {
                id: 2,
                description: 'Lave lektier',
                dueDate: new Date('2023-08-07'),
                completed: true,
            },
            {
                id: 3,
                description: 'Træne',
                dueDate: new Date('2023-08-07'),
                completed: false,
            },
        ],
    },
    {
        id: 1,
        title: 'Tirsdag',
        description: 'Hvad skal jeg lave om tirsdagen',
        dueDate: new Date('2023-08-08'), // Make sure to use the correct date format (YYYY-MM-DD)
        priority: Priority.low,
        completed: false,
        tasks: [
            {
                id: 1,
                description: 'Kodning',
                dueDate: new Date('2023-08-08'),
                completed: true,
            },
            {
                id: 2,
                description: 'Spille Diablo 4',
                dueDate: new Date('2023-08-08'),
                completed: false,
            },
            {
                id: 3,
                description: 'Træne',
                dueDate: new Date('2023-08-08'),
                completed: true,
            },
        ],
    },
    // You can add more task lists here
];
