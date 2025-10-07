import Quiz from '../models/quiz.js';

// Create or get the sample quiz
export const getSampleQuiz = async (req, res) => {
    try {
        // Check if sample quiz already exists
        let sampleQuiz = await Quiz.findOne({ 
            userId: 'system',
            topic: 'JavaScript Basics - Sample Quiz'
        });

        // If sample quiz doesn't exist, create it
        if (!sampleQuiz) {
            sampleQuiz = await Quiz.create({
                userId: 'system',
                topic: 'JavaScript Basics - Sample Quiz',
                questions: [
                    {
                        text: 'What is the type of NaN in JavaScript?',
                        options: [
                            { id: 1, text: 'String' },
                            { id: 2, text: 'Number' },
                            { id: 3, text: 'Undefined' },
                            { id: 4, text: 'Object' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'How do you create a promise in JavaScript?',
                        options: [
                            { id: 1, text: 'new Promise()' },
                            { id: 2, text: 'Promise.create()' },
                            { id: 3, text: 'createPromise()' },
                            { id: 4, text: 'Promise.new()' }
                        ],
                        correct_option_id: 1
                    },
                    {
                        text: 'Which method mutates the original array?',
                        options: [
                            { id: 1, text: 'map()' },
                            { id: 2, text: 'filter()' },
                            { id: 3, text: 'push()' },
                            { id: 4, text: 'concat()' }
                        ],
                        correct_option_id: 3
                    },
                    {
                        text: 'What does "this" keyword refer to in arrow functions?',
                        options: [
                            { id: 1, text: 'The global object' },
                            { id: 2, text: 'The parent scope' },
                            { id: 3, text: 'The function itself' },
                            { id: 4, text: 'undefined' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'Which is the correct way to declare a constant in JavaScript?',
                        options: [
                            { id: 1, text: 'constant x = 10;' },
                            { id: 2, text: 'const x = 10;' },
                            { id: 3, text: 'let x = 10;' },
                            { id: 4, text: 'var x = 10;' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'What is the output of: typeof []?',
                        options: [
                            { id: 1, text: 'array' },
                            { id: 2, text: 'object' },
                            { id: 3, text: 'Array' },
                            { id: 4, text: 'undefined' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'Which method is used to parse a string to an integer?',
                        options: [
                            { id: 1, text: 'Integer.parse()' },
                            { id: 2, text: 'parseInt()' },
                            { id: 3, text: 'toInteger()' },
                            { id: 4, text: 'Number.parse()' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'What does JSON stand for?',
                        options: [
                            { id: 1, text: 'JavaScript Object Notation' },
                            { id: 2, text: 'Java Source Object Notation' },
                            { id: 3, text: 'JavaScript Online Notation' },
                            { id: 4, text: 'Java Serialized Object Notation' }
                        ],
                        correct_option_id: 1
                    },
                    {
                        text: 'Which operator is used for strict equality comparison?',
                        options: [
                            { id: 1, text: '==' },
                            { id: 2, text: '===' },
                            { id: 3, text: '=' },
                            { id: 4, text: '!=' }
                        ],
                        correct_option_id: 2
                    },
                    {
                        text: 'What is the result of: 2 + "2"?',
                        options: [
                            { id: 1, text: '4' },
                            { id: 2, text: '22' },
                            { id: 3, text: 'NaN' },
                            { id: 4, text: 'Error' }
                        ],
                        correct_option_id: 2
                    }
                ]
            });
        }

        // Return quiz without correct answers for security
        const cleanedQuestions = sampleQuiz.questions.map(q => ({
            _id: q._id,
            text: q.text,
            options: q.options
        }));

        return res.status(200).json({
            quizId: sampleQuiz._id,
            topic: sampleQuiz.topic,
            questions: cleanedQuestions,
            isSample: true,
            createdAt: sampleQuiz.createdAt
        });

    } catch (err) {
        console.error("Error fetching sample quiz:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default getSampleQuiz;
