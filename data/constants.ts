
import { StreamType } from '../types';

export const COLLEGES = [
  'Thiagarajar college of engineering',
  'Kamaraj college of engineering',
  'SRM Madurai college of engineering and technology',
  'Anna university regional campus (Ramanathapuram)',
  'Other'
];

export const COURSE_CONTENT = [
    {
        title: "Section 1: Introduction",
        lessons: [
            { id: 'l1', title: "Welcome to the Course", duration: "2:30", type: 'video', completed: true },
            { id: 'l2', title: "Setting up Environment", duration: "15:00", type: 'video', completed: true },
            { id: 'l3', title: "React Ecosystem", duration: "10:45", type: 'video', completed: false },
        ]
    },
    {
        title: "Section 2: Core Concepts",
        lessons: [
            { id: 'l4', title: "JSX Deep Dive", duration: "12:20", type: 'video', completed: false, locked: true },
            { id: 'l5', title: "Props & State", duration: "20:10", type: 'video', completed: false, locked: true },
            { id: 'l6', title: "Handling Events", duration: "18:00", type: 'video', completed: false, locked: true },
        ]
    },
    {
        title: "Section 3: Advanced Hooks",
        lessons: [
            { id: 'l7', title: "useEffect Mastery", duration: "25:00", type: 'video', completed: false, locked: true },
            { id: 'l8', title: "useContext & Reducers", duration: "30:00", type: 'video', completed: false, locked: true },
        ]
    }
];

export const DEFAULT_PROJECTS = [
    {
        title: "Emotion Recognition for Autism",
        description: "Create an AI-agent that helps autistic children identify emotions from facial expressions using Tensorflow.js and WebCam. The app should be gamified and provide real-time feedback.",
        recommended: true
    },
    // Add more projects here as needed
];
