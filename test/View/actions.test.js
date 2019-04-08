import * as actions from "../../src/redux/actions/actions";
import { expect } from "chai";

describe("Actions", () => {
    it("it should send action to load topics", done => {
        const test = actions.loadAllTopics();
        test(action => {
            action.type.should.eql("LOAD_TOPICS");
            done();
        });
    });
});
