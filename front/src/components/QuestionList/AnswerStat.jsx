import React from "react";

const AnswerStat = (props) => {
    const answerId = props.Aid;
    const answerCount = props.count;

    return (
        <div>
            {answerId} : {answerCount}
        </div>
    )
}

export default AnswerStat;