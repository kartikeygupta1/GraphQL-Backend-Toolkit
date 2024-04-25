const { Accordion } = require("@mantine/core");

const QuerryHandler = () => {
    const {
        querryList,
        addnewQuerry,
        removeQuerry,
        addParameter,
        removeQueryParameter
    } = GraphContext();
    const fieldNameRef = useRef();
    const fieldTypeRef = useRef();

    return (
        <div>


            <Accordion defaultActiveKey="0">

            </Accordion>



        </div>
    )
}