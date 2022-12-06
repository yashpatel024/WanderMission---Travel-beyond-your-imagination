import { longlink } from "../Trip";

class CommonFunctions {


    /*TO Generate HashCode */
    static hashCode(str) {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    static Getcomments(userComments) {
        userComments.map(
            comments => {
                return (
                    <div className="comment" key={comments._id}>
                        <h3 className="Person-name"> {comments.firstname}{comments.lastname}</h3>
                        <h3 className="comment-text">{comments.content}</h3>
                    </div>
                )
            }
        )
    }


}

export default CommonFunctions;