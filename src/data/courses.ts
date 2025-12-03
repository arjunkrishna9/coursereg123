export interface Slot {
  id: string;
  day: string;
  time: string;
  code: string;
}

export interface Faculty {
  id: string;
  name: string;
  slots: Slot[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: 'Theory' | 'Lab' | 'Project';
  category: string;
  faculty: Faculty[];
}

export const SLOT_TIMINGS: Record<string, string> = {
  'A1': 'Mon 8:00-8:50',
  'A2': 'Wed 8:00-8:50',
  'B1': 'Mon 9:00-9:50',
  'B2': 'Wed 9:00-9:50',
  'C1': 'Mon 10:00-10:50',
  'C2': 'Wed 10:00-10:50',
  'D1': 'Mon 11:00-11:50',
  'D2': 'Wed 11:00-11:50',
  'E1': 'Tue 8:00-8:50',
  'E2': 'Thu 8:00-8:50',
  'F1': 'Tue 9:00-9:50',
  'F2': 'Thu 9:00-9:50',
  'G1': 'Tue 10:00-10:50',
  'G2': 'Thu 10:00-10:50',
  'TA1': 'Mon 12:00-12:50',
  'TA2': 'Wed 12:00-12:50',
  'TB1': 'Mon 14:00-14:50',
  'TB2': 'Wed 14:00-14:50',
  'TC1': 'Tue 12:00-12:50',
  'TC2': 'Thu 12:00-12:50',
  'TD1': 'Tue 14:00-14:50',
  'TD2': 'Thu 14:00-14:50',
  'L1': 'Mon 8:00-8:50',
  'L2': 'Mon 8:50-9:40',
  'L3': 'Mon 10:00-10:50',
  'L4': 'Mon 10:50-11:40',
  'L5': 'Mon 11:40-12:30',
  'L6': 'Mon 12:30-13:20',
  'L7': 'Tue 8:00-8:50',
  'L8': 'Tue 8:50-9:40',
  'L9': 'Tue 10:00-10:50',
  'L10': 'Tue 10:50-11:40',
  'L11': 'Tue 11:40-12:30',
  'L12': 'Tue 12:30-13:20',
  'L13': 'Wed 8:00-8:50',
  'L14': 'Wed 8:50-9:40',
  'L15': 'Wed 10:00-10:50',
  'L16': 'Wed 10:50-11:40',
  'L17': 'Wed 11:40-12:30',
  'L18': 'Wed 12:30-13:20',
  'L19': 'Thu 8:00-8:50',
  'L20': 'Thu 8:50-9:40',
  'L21': 'Thu 10:00-10:50',
  'L22': 'Thu 10:50-11:40',
  'L23': 'Thu 11:40-12:30',
  'L24': 'Thu 12:30-13:20',
  'L25': 'Fri 8:00-8:50',
  'L26': 'Fri 8:50-9:40',
  'L27': 'Fri 10:00-10:50',
  'L28': 'Fri 10:50-11:40',
  'L29': 'Fri 11:40-12:30',
  'L30': 'Fri 12:30-13:20',
};

export const courses: Course[] = [
  {
    id: '1',
    code: 'CSE1001',
    name: 'Problem Solving and Programming',
    credits: 4,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f1',
        name: 'Dr. Rajesh Kumar',
        slots: [
          { id: 's1', day: 'Mon', time: '8:00-8:50', code: 'A1+TA1' },
          { id: 's2', day: 'Wed', time: '9:00-9:50', code: 'B2+TB2' },
        ]
      },
      {
        id: 'f2',
        name: 'Dr. Priya Sharma',
        slots: [
          { id: 's3', day: 'Tue', time: '8:00-8:50', code: 'E1+TC1' },
          { id: 's4', day: 'Thu', time: '10:00-10:50', code: 'G2+TD2' },
        ]
      },
      {
        id: 'f3',
        name: 'Prof. Amit Singh',
        slots: [
          { id: 's5', day: 'Mon', time: '10:00-10:50', code: 'C1+TA2' },
        ]
      }
    ]
  },
  {
    id: '2',
    code: 'CSE1002',
    name: 'Problem Solving and Programming Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Core',
    faculty: [
      {
        id: 'f4',
        name: 'Dr. Rajesh Kumar',
        slots: [
          { id: 's6', day: 'Mon', time: '14:00-16:00', code: 'L1+L2' },
          { id: 's7', day: 'Wed', time: '14:00-16:00', code: 'L13+L14' },
        ]
      },
      {
        id: 'f5',
        name: 'Dr. Priya Sharma',
        slots: [
          { id: 's8', day: 'Tue', time: '10:00-12:00', code: 'L9+L10' },
        ]
      }
    ]
  },
  {
    id: '3',
    code: 'MAT1001',
    name: 'Calculus and Linear Algebra',
    credits: 4,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f6',
        name: 'Dr. Sunita Verma',
        slots: [
          { id: 's9', day: 'Mon', time: '9:00-9:50', code: 'B1+TB1' },
          { id: 's10', day: 'Wed', time: '8:00-8:50', code: 'A2+TA2' },
        ]
      },
      {
        id: 'f7',
        name: 'Prof. Deepak Joshi',
        slots: [
          { id: 's11', day: 'Tue', time: '9:00-9:50', code: 'F1+TC2' },
        ]
      },
      {
        id: 'f8',
        name: 'Dr. Meera Patel',
        slots: [
          { id: 's12', day: 'Thu', time: '8:00-8:50', code: 'E2+TD1' },
        ]
      }
    ]
  },
  {
    id: '4',
    code: 'PHY1001',
    name: 'Engineering Physics',
    credits: 3,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f9',
        name: 'Dr. Anil Kapoor',
        slots: [
          { id: 's13', day: 'Mon', time: '11:00-11:50', code: 'D1+TD2' },
        ]
      },
      {
        id: 'f10',
        name: 'Prof. Kavita Reddy',
        slots: [
          { id: 's14', day: 'Tue', time: '10:00-10:50', code: 'G1+TC1' },
          { id: 's15', day: 'Thu', time: '9:00-9:50', code: 'F2+TD1' },
        ]
      }
    ]
  },
  {
    id: '5',
    code: 'PHY1002',
    name: 'Engineering Physics Lab',
    credits: 1,
    type: 'Lab',
    category: 'University Core',
    faculty: [
      {
        id: 'f11',
        name: 'Dr. Anil Kapoor',
        slots: [
          { id: 's16', day: 'Fri', time: '8:00-10:00', code: 'L25+L26' },
        ]
      },
      {
        id: 'f12',
        name: 'Prof. Kavita Reddy',
        slots: [
          { id: 's17', day: 'Fri', time: '10:00-12:00', code: 'L27+L28' },
        ]
      }
    ]
  },
  {
    id: '6',
    code: 'CSE2001',
    name: 'Data Structures and Algorithms',
    credits: 4,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f13',
        name: 'Dr. Vikram Malhotra',
        slots: [
          { id: 's18', day: 'Mon', time: '8:00-8:50', code: 'A1+TA1' },
          { id: 's19', day: 'Wed', time: '10:00-10:50', code: 'C2+TB2' },
        ]
      },
      {
        id: 'f14',
        name: 'Dr. Sneha Gupta',
        slots: [
          { id: 's20', day: 'Tue', time: '8:00-8:50', code: 'E1+TC1' },
        ]
      },
      {
        id: 'f15',
        name: 'Prof. Rahul Nair',
        slots: [
          { id: 's21', day: 'Thu', time: '10:00-10:50', code: 'G2+TD2' },
        ]
      }
    ]
  },
  {
    id: '7',
    code: 'CSE2002',
    name: 'Data Structures Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Core',
    faculty: [
      {
        id: 'f16',
        name: 'Dr. Vikram Malhotra',
        slots: [
          { id: 's22', day: 'Mon', time: '14:00-16:00', code: 'L3+L4' },
        ]
      },
      {
        id: 'f17',
        name: 'Dr. Sneha Gupta',
        slots: [
          { id: 's23', day: 'Wed', time: '14:00-16:00', code: 'L15+L16' },
        ]
      }
    ]
  },
  {
    id: '8',
    code: 'CSE3001',
    name: 'Database Management Systems',
    credits: 3,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f18',
        name: 'Dr. Neha Saxena',
        slots: [
          { id: 's24', day: 'Mon', time: '9:00-9:50', code: 'B1+TB1' },
        ]
      },
      {
        id: 'f19',
        name: 'Prof. Sanjay Mehta',
        slots: [
          { id: 's25', day: 'Tue', time: '11:00-11:50', code: 'G1+TC2' },
          { id: 's26', day: 'Thu', time: '8:00-8:50', code: 'E2+TD1' },
        ]
      }
    ]
  },
  {
    id: '9',
    code: 'CSE3002',
    name: 'Database Management Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Core',
    faculty: [
      {
        id: 'f20',
        name: 'Dr. Neha Saxena',
        slots: [
          { id: 's27', day: 'Tue', time: '14:00-16:00', code: 'L11+L12' },
        ]
      },
      {
        id: 'f21',
        name: 'Prof. Sanjay Mehta',
        slots: [
          { id: 's28', day: 'Thu', time: '14:00-16:00', code: 'L23+L24' },
        ]
      }
    ]
  },
  {
    id: '10',
    code: 'CSE3003',
    name: 'Operating Systems',
    credits: 4,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f22',
        name: 'Dr. Ashok Sharma',
        slots: [
          { id: 's29', day: 'Mon', time: '10:00-10:50', code: 'C1+TA2' },
        ]
      },
      {
        id: 'f23',
        name: 'Prof. Ritu Agarwal',
        slots: [
          { id: 's30', day: 'Wed', time: '9:00-9:50', code: 'B2+TB2' },
          { id: 's31', day: 'Fri', time: '8:00-8:50', code: 'A1+TA1' },
        ]
      }
    ]
  },
  {
    id: '11',
    code: 'CSE3004',
    name: 'Computer Networks',
    credits: 3,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f24',
        name: 'Dr. Pooja Mishra',
        slots: [
          { id: 's32', day: 'Tue', time: '9:00-9:50', code: 'F1+TC1' },
        ]
      },
      {
        id: 'f25',
        name: 'Prof. Manish Tiwari',
        slots: [
          { id: 's33', day: 'Thu', time: '11:00-11:50', code: 'G2+TD2' },
        ]
      }
    ]
  },
  {
    id: '12',
    code: 'CSE4001',
    name: 'Machine Learning',
    credits: 4,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f26',
        name: 'Dr. Anita Desai',
        slots: [
          { id: 's34', day: 'Mon', time: '8:00-8:50', code: 'A1+TA1' },
        ]
      },
      {
        id: 'f27',
        name: 'Prof. Karan Shah',
        slots: [
          { id: 's35', day: 'Wed', time: '10:00-10:50', code: 'C2+TB2' },
          { id: 's36', day: 'Fri', time: '9:00-9:50', code: 'B1+TB1' },
        ]
      }
    ]
  },
  {
    id: '13',
    code: 'CSE4002',
    name: 'Machine Learning Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f28',
        name: 'Dr. Anita Desai',
        slots: [
          { id: 's37', day: 'Tue', time: '8:00-10:00', code: 'L7+L8' },
        ]
      },
      {
        id: 'f29',
        name: 'Prof. Karan Shah',
        slots: [
          { id: 's38', day: 'Thu', time: '10:00-12:00', code: 'L21+L22' },
        ]
      }
    ]
  },
  {
    id: '14',
    code: 'CSE4003',
    name: 'Artificial Intelligence',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f30',
        name: 'Dr. Rohit Bansal',
        slots: [
          { id: 's39', day: 'Mon', time: '11:00-11:50', code: 'D1+TD1' },
        ]
      },
      {
        id: 'f31',
        name: 'Prof. Nisha Verma',
        slots: [
          { id: 's40', day: 'Wed', time: '8:00-8:50', code: 'A2+TA2' },
        ]
      }
    ]
  },
  {
    id: '15',
    code: 'CSE4004',
    name: 'Cloud Computing',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f32',
        name: 'Dr. Vivek Chauhan',
        slots: [
          { id: 's41', day: 'Tue', time: '10:00-10:50', code: 'G1+TC2' },
        ]
      },
      {
        id: 'f33',
        name: 'Prof. Divya Jain',
        slots: [
          { id: 's42', day: 'Thu', time: '9:00-9:50', code: 'F2+TD2' },
        ]
      }
    ]
  },
  {
    id: '16',
    code: 'CSE4005',
    name: 'Cyber Security',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f34',
        name: 'Dr. Suresh Iyer',
        slots: [
          { id: 's43', day: 'Mon', time: '9:00-9:50', code: 'B1+TB1' },
        ]
      },
      {
        id: 'f35',
        name: 'Prof. Anjali Singh',
        slots: [
          { id: 's44', day: 'Wed', time: '11:00-11:50', code: 'D2+TD2' },
        ]
      }
    ]
  },
  {
    id: '17',
    code: 'CSE4006',
    name: 'Web Technologies',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f36',
        name: 'Dr. Prakash Rao',
        slots: [
          { id: 's45', day: 'Tue', time: '8:00-8:50', code: 'E1+TC1' },
        ]
      },
      {
        id: 'f37',
        name: 'Prof. Lakshmi Narayan',
        slots: [
          { id: 's46', day: 'Thu', time: '10:00-10:50', code: 'G2+TC2' },
        ]
      }
    ]
  },
  {
    id: '18',
    code: 'CSE4007',
    name: 'Web Technologies Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f38',
        name: 'Dr. Prakash Rao',
        slots: [
          { id: 's47', day: 'Mon', time: '14:00-16:00', code: 'L5+L6' },
        ]
      },
      {
        id: 'f39',
        name: 'Prof. Lakshmi Narayan',
        slots: [
          { id: 's48', day: 'Fri', time: '10:00-12:00', code: 'L27+L28' },
        ]
      }
    ]
  },
  {
    id: '19',
    code: 'HUM1001',
    name: 'Professional Ethics',
    credits: 2,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f40',
        name: 'Dr. Ramesh Babu',
        slots: [
          { id: 's49', day: 'Mon', time: '12:00-12:50', code: 'TA1' },
        ]
      },
      {
        id: 'f41',
        name: 'Prof. Geeta Krishnan',
        slots: [
          { id: 's50', day: 'Wed', time: '12:00-12:50', code: 'TA2' },
        ]
      }
    ]
  },
  {
    id: '20',
    code: 'HUM1002',
    name: 'Technical Communication',
    credits: 2,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f42',
        name: 'Dr. Maya Sundaram',
        slots: [
          { id: 's51', day: 'Tue', time: '12:00-12:50', code: 'TC1' },
        ]
      },
      {
        id: 'f43',
        name: 'Prof. Arjun Menon',
        slots: [
          { id: 's52', day: 'Thu', time: '12:00-12:50', code: 'TC2' },
        ]
      }
    ]
  },
  {
    id: '21',
    code: 'CSE5001',
    name: 'Deep Learning',
    credits: 4,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f44',
        name: 'Dr. Siddharth Patel',
        slots: [
          { id: 's53', day: 'Mon', time: '10:00-10:50', code: 'C1+TA2' },
          { id: 's54', day: 'Wed', time: '8:00-8:50', code: 'A2+TB1' },
        ]
      },
      {
        id: 'f45',
        name: 'Prof. Rekha Sharma',
        slots: [
          { id: 's55', day: 'Tue', time: '9:00-9:50', code: 'F1+TC2' },
        ]
      }
    ]
  },
  {
    id: '22',
    code: 'CSE5002',
    name: 'Natural Language Processing',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f46',
        name: 'Dr. Pallavi Gupta',
        slots: [
          { id: 's56', day: 'Thu', time: '8:00-8:50', code: 'E2+TD1' },
        ]
      },
      {
        id: 'f47',
        name: 'Prof. Vinod Kumar',
        slots: [
          { id: 's57', day: 'Fri', time: '10:00-10:50', code: 'C1+TB2' },
        ]
      }
    ]
  },
  {
    id: '23',
    code: 'CSE5003',
    name: 'Computer Vision',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f48',
        name: 'Dr. Arun Prasad',
        slots: [
          { id: 's58', day: 'Mon', time: '11:00-11:50', code: 'D1+TD2' },
        ]
      },
      {
        id: 'f49',
        name: 'Prof. Shweta Kapoor',
        slots: [
          { id: 's59', day: 'Wed', time: '9:00-9:50', code: 'B2+TA1' },
        ]
      }
    ]
  },
  {
    id: '24',
    code: 'CSE5004',
    name: 'Blockchain Technology',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f50',
        name: 'Dr. Nitin Sharma',
        slots: [
          { id: 's60', day: 'Tue', time: '10:00-10:50', code: 'G1+TC1' },
        ]
      },
      {
        id: 'f51',
        name: 'Prof. Aarti Deshmukh',
        slots: [
          { id: 's61', day: 'Thu', time: '11:00-11:50', code: 'D2+TD2' },
        ]
      }
    ]
  },
  {
    id: '25',
    code: 'CSE5005',
    name: 'Internet of Things',
    credits: 3,
    type: 'Theory',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f52',
        name: 'Dr. Raghav Menon',
        slots: [
          { id: 's62', day: 'Mon', time: '8:00-8:50', code: 'A1+TB1' },
        ]
      },
      {
        id: 'f53',
        name: 'Prof. Jyoti Ranjan',
        slots: [
          { id: 's63', day: 'Fri', time: '9:00-9:50', code: 'B1+TA2' },
        ]
      }
    ]
  },
  {
    id: '26',
    code: 'CSE5006',
    name: 'IoT Lab',
    credits: 2,
    type: 'Lab',
    category: 'Program Elective',
    faculty: [
      {
        id: 'f54',
        name: 'Dr. Raghav Menon',
        slots: [
          { id: 's64', day: 'Wed', time: '14:00-16:00', code: 'L17+L18' },
        ]
      },
      {
        id: 'f55',
        name: 'Prof. Jyoti Ranjan',
        slots: [
          { id: 's65', day: 'Fri', time: '14:00-16:00', code: 'L29+L30' },
        ]
      }
    ]
  },
  {
    id: '27',
    code: 'MAT2001',
    name: 'Probability and Statistics',
    credits: 3,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f56',
        name: 'Dr. Santosh Kumar',
        slots: [
          { id: 's66', day: 'Mon', time: '9:00-9:50', code: 'B1+TB2' },
        ]
      },
      {
        id: 'f57',
        name: 'Prof. Leela Devi',
        slots: [
          { id: 's67', day: 'Wed', time: '10:00-10:50', code: 'C2+TA1' },
        ]
      }
    ]
  },
  {
    id: '28',
    code: 'MAT2002',
    name: 'Discrete Mathematics',
    credits: 3,
    type: 'Theory',
    category: 'University Core',
    faculty: [
      {
        id: 'f58',
        name: 'Dr. Harish Chandra',
        slots: [
          { id: 's68', day: 'Tue', time: '8:00-8:50', code: 'E1+TC2' },
        ]
      },
      {
        id: 'f59',
        name: 'Prof. Seema Agarwal',
        slots: [
          { id: 's69', day: 'Thu', time: '9:00-9:50', code: 'F2+TD1' },
        ]
      }
    ]
  },
  {
    id: '29',
    code: 'EEE1001',
    name: 'Digital Electronics',
    credits: 3,
    type: 'Theory',
    category: 'Program Core',
    faculty: [
      {
        id: 'f60',
        name: 'Dr. Mohan Lal',
        slots: [
          { id: 's70', day: 'Mon', time: '10:00-10:50', code: 'C1+TB1' },
        ]
      },
      {
        id: 'f61',
        name: 'Prof. Usha Rani',
        slots: [
          { id: 's71', day: 'Wed', time: '11:00-11:50', code: 'D2+TA2' },
        ]
      }
    ]
  },
  {
    id: '30',
    code: 'EEE1002',
    name: 'Digital Electronics Lab',
    credits: 1,
    type: 'Lab',
    category: 'Program Core',
    faculty: [
      {
        id: 'f62',
        name: 'Dr. Mohan Lal',
        slots: [
          { id: 's72', day: 'Tue', time: '14:00-16:00', code: 'L11+L12' },
        ]
      },
      {
        id: 'f63',
        name: 'Prof. Usha Rani',
        slots: [
          { id: 's73', day: 'Thu', time: '14:00-16:00', code: 'L23+L24' },
        ]
      }
    ]
  }
];

export const DEMO_CREDENTIALS: Record<string, { regNo: string; password: string; name: string }> = {
  '22': { regNo: '22BCE10633', password: 'demo123', name: 'ARJUN GUPTA' },
  '23': { regNo: '23BCE10633', password: 'demo123', name: 'ARJUN GUPTA' },
  '24': { regNo: '24BCE10633', password: 'demo123', name: 'ARJUN GUPTA' },
  '25': { regNo: '25BCE10633', password: 'demo123', name: 'ARJUN GUPTA' },
};

export const MAX_CREDITS = 27;
