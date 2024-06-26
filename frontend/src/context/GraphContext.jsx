import { createContext, useContext, useState } from 'react';
import useAppContext from './AppContext';

const GraphContext = createContext();

const NEW_QUERY = {
    name: 'getEntity',
    type: 'readAll',
    parameters: [
        {
            name: 'id',
            type: 'ObjectId',
            required: true
        }
    ],
    returnType: 'Entity',

};

const NEW_MUTATION = {
    name: 'updateProduct',
    type: 'add',
    parameters: [
        {
            name: 'id',
            type: 'ID',
            required: true
        },
        {
            name: 'field1',
            type: 'String',
            required: true
        },
    ],
    returnType: 'Entity'
}

const NEW_ENTITY = {
    name: 'entityName',
    fields: [
        {
            name: 'field1',
            type: 'ObjectId'
        },
        {
            name: 'field2',
            type: 'Number'
        }
    ]
}

export const GraphProvider = ({ children }) => {

    const [queryList, setQueryList] = useState(null);
    const [mutationList, setMutationList] = useState(null);
    const [entityList, setEntityList] = useState(null);
    const [mongoDbUrl, setMongoDbUrl] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState('');

    const { currentUser } = useAppContext();

    const fetchProjectsData = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getbyuser`, {
            headers: {
                'x-auth-token': currentUser.token,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProjectList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const loadProject = (project) => {
        // console.log(project);
        setProjectId(project._id);
        setQueryList(project.config.queryList);
        setMutationList(project.config.mutationList);
        setEntityList(project.config.entityList);
        setMongoDbUrl(project.config.mongoDbUrl);
        setProjectName(project.name);
    }

    const isProjectLoading = () => {
        return queryList === null || mutationList === null || entityList === null;
    }

    const addNewQuery = () => {
        setQueryList([...queryList, NEW_QUERY]);
    }

    const removeQuery = (index) => {
        const newQueryList = [...queryList];
        newQueryList.splice(index, 1);
        setQueryList(newQueryList);
    }

    const addNewMutation = () => {
        setMutationList([...mutationList, NEW_MUTATION]);
    }

    const removeMutation = (index) => {
        const newMutationList = [...mutationList];
        newMutationList.splice(index, 1);
        setMutationList(newMutationList);
    }

    const addNewEntity = () => {
        setEntityList([...entityList, NEW_ENTITY]);
    }

    const removeEntity = (index) => {
        const newEntityList = [...entityList];
        newEntityList.splice(index, 1);
        setEntityList(newEntityList);
    }

    const updateQueryName = (index, name) => {
        const newQueryList = [...queryList];
        newQueryList[index].name = name;
        setQueryList(newQueryList);
    }

    const updateQueryParameter = (index, parameter, type, constraint) => {
        const newQueryList = [...queryList];
        newQueryList[index].parameters.push({
            name: parameter,
            type,
            required: constraint
        });
        setQueryList(newQueryList);
    }

    const updateQueryReturnType = (index, returnType) => {
        const newQueryList = [...queryList];
        newQueryList[index].returnType = returnType;
        setQueryList(newQueryList);
    }

    const removeQueryParameter = (index, parameterIndex) => {
        const newQueryList = [...queryList];
        newQueryList[index].parameters.splice(parameterIndex, 1);
        setQueryList(newQueryList);
    }

    const updateMutationName = (index, name) => {
        const newMutationList = [...mutationList];
        newMutationList[index].name = name;
        setMutationList(newMutationList);
    }

    const addMutationParameter = (index, parameter, type, constraint = "") => {
        const newMutationList = [...mutationList];
        newMutationList[index].parameters.push({
            name: parameter,
            type,
            required: constraint
        });
        setMutationList(newMutationList);

    }

    const updateMutationReturnType = (index, returnType) => {
        const newMutationList = [...mutationList];
        newMutationList[index].returnType = returnType;
        setMutationList(newMutationList);
    }

    const removeMutationParameter = (index, parameterIndex) => {
        const newMutationList = [...mutationList];
        newMutationList[index].parameters.splice(parameterIndex, 1);
        setMutationList(newMutationList);
    }

    const addEntityField = (index, field, type) => {
        const newEntityList = [...entityList];
        newEntityList[index].fields.push({ name: field, type });
        setEntityList(newEntityList);
    }

    const updateEntityName = (index, name) => {
        const newEntityList = [...entityList];
        newEntityList[index].name = name;
        setEntityList(newEntityList);
    }

    const updateEntityField = (entityIndex, fieldIndex, field) => {
        const newEntityList = [...entityList];
        newEntityList[entityIndex].fields[fieldIndex] = field;
        setEntityList(newEntityList);
    }

    const removeEntityField = (entityIndex, fieldIndex) => {
        const newEntityList = [...entityList];
        newEntityList[entityIndex].fields.splice(fieldIndex, 1);
        setEntityList(newEntityList);
    }

    const deleteProject = () => {
        fetch(`http://localhost:5000/project/delete/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.status);

            if (res.status === 200) {

                toast.success('Project deleted successfully');
                res.json().then(data => {

                    console.log(data);
                    setQueryList(null);
                    setMutationList(null);
                    setEntityList(null);
                    setMongoDbUrl('');
                    setProjectId('');
                    setProjectName('');
                    fetchProjectsData();
                })
            } else {
                toast.error('Project delete failed');
            }
        }
        ).catch((err) => {
            console.log(err);
        });
    }


    const updateProjectData = () => {
        fetch(`http://localhost:5000/project/update/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    config: {
                        queryList,
                        mutationList,
                        entityList,
                        mongoDbUrl
                    }
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                toast.success('Project updated successfully');
                res.json().then(data => {
                    console.log(data);
                })
            } else {
                toast.error('Project update failed');
            }
        }).catch((err) => {
            console.log(err);
        });
    }



    return (
        <GraphContext.Provider value={{
            fetchProjectsData,
            queryList,
            mutationList,
            entityList,
            mongoDbUrl,
            setMongoDbUrl,
            loadProject,
            addNewQuery,
            addEntityField,
            updateEntityName,
            updateEntityField,
            removeEntityField,
            removeEntity,
            updateProjectData,
            deleteProject,
            isProjectLoading,
            addNewMutation,
            addNewEntity,
            updateQueryName,
            updateQueryParameter,
            updateQueryReturnType,
            removeQueryParameter,
            removeQuery,
            updateMutationName,
            addMutationParameter,
            updateMutationReturnType,
            removeMutationParameter,
            removeMutation,
            projectList,
            setProjectList,
            projectName,
            setProjectName,
            projectId

        }}>
            {children}
        </GraphContext.Provider>
    );
}

const useGraphContext = () => useContext(GraphContext);

export default useGraphContext;

