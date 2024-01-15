import { createStore } from "redux";

const defaultSate = {
    userData: null,
    zakazi: null,
    pfotoObject: null,
    statusy: null,
    currentNumber: null,

}

const reducer = (state = defaultSate, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return { ...state, userData: action.payload };
        case "SET_STATUSY":
            return { ...state, statusy: action.payload };
        case "SET_ZAKAZI":
            return { ...state, zakazi: action.payload };
        case "CURRENT_NUMBER":
            return { ...state, currentNumber: action.payload };
        case "SET_PFOTO_OF_ZAKAZI":
            return { ...state, pfotoObject: action.payload };




        case "UPDATE_DATE":
            return { ...state, semesterStartDate: action.date };
        case "CANCLE_UPDATING":
            return { ...state, isUpdated: action.payload };
        case "SET_DATA":
            return {
                ...state,
                daysKey: action.keys,
                dayDataByKey: action.dataByKeys,
                lessonsByIdData: action.lessonsData
            };
        case "CHANGE_PRESENT":
            const updateStudents = {
                ...state.lessonsByIdData[action.lessonKey].students.dataById,
                [action.studentKey]: {
                    name: action.name,
                    isHere: !action.isHere,
                    desc: action.desc,
                    flag: action.flag
                }
            };
            return {
                ...state,
                lessonsByIdData: {
                    ...state.lessonsByIdData,
                    [action.lessonKey]: {
                        ...state.lessonsByIdData[action.lessonKey],
                        students: {
                            ...state.lessonsByIdData[action.lessonKey].students,
                            dataById: updateStudents
                        }
                    }
                }
            };
        case "CHANGE_DESCRIPTION":
            const updateStudentsDescription = {
                ...state.lessonsByIdData[action.lessonKey].students.dataById,
                [action.studentKey]: {
                    name: action.name,
                    isHere: action.isHere,
                    desc: action.desc,
                    flag: action.flag
                }
            };
            return {
                ...state,
                lessonsByIdData: {
                    ...state.lessonsByIdData,
                    [action.lessonKey]: {
                        ...state.lessonsByIdData[action.lessonKey],
                        students: {
                            ...state.lessonsByIdData[action.lessonKey].students,
                            dataById: updateStudentsDescription
                        }
                    }
                }
            };
        case "SAVE_CHANGES":
            saveChanges(state.daysKey, state.dayDataByKey, state.lessonsByIdData);
            return { ...state };
        case "SET_STUDENTS":
            return { ...state, studentsList: action.payload };
        case "ADD_STUDENT":
            let addedList = state.studentsList.concat(action.payload);
            saveValue(addedList);
            return {
                ...state,
                studentsList: addedList
            };
        case "UPDATE_STUDENTS":
            saveValue(action.payload);
            return { ...state, studentsList: action.payload };
        case "CHANGE_FLAG":
            const updatedStudent = [...state.studentsList]
            updatedStudent[action.index].flag = action.flag
            saveValue(updatedStudent);
            return { ...state, studentsList: updatedStudent };

        case "DELETE_STUDENT":
            let updatedList = state.studentsList.slice(0, action.payload).concat(state.studentsList.slice(action.payload + 1));
            saveValue(updatedList);
            return {
                ...state,
                studentsList: updatedList
            };
        case "CHANGE_VALUE":
            const updatedData = {
                ...state.warField.dataById,
                [action.key]: { value: action.value, title: action.title }
            };
            return {
                ...state,
                warField: {
                    ...state.warField,
                    dataById: updatedData
                }
            };
        default:
            return state;

    }
}

export const store = createStore(reducer);