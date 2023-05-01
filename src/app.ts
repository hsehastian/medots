const config: { [input: string]: string[] } = {};

const addValidator = (input: string, type: string) => {
    config[input] = config[input] ? [...config[input], type] : [type];
};

const Required = (_: any, input: string) => addValidator(input, 'required');
const Maxlength = (_: any, input: string) => addValidator(input, 'maxlength');
const Positive = (_: any, input: string) => addValidator(input, 'positive');

const validate = (course: any) =>
    Object.entries(config).every(([input, types]) =>
        types.every(
            (type) =>
                (type === 'required' && course[input]) ||
                (type === 'positive' && course[input] > 0) ||
                (type === 'maxlength' && course[input].length < 5)
        )
    );

class Course {
    @Required @Maxlength title: string;
    @Required @Positive price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}
