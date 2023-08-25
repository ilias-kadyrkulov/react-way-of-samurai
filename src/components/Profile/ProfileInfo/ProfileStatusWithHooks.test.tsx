import React from "react";
import { ReactTestInstance, create } from "react-test-renderer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { updateStatus } from "../../../redux/profile-reducer";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(
      <ProfileStatusWithHooks
        updateStatus={updateStatus}
        status="it-kamasutra.com"
      />
    );
    const instance = component.getInstance() as ReactTestInstance;
    expect(instance.props.status).toBe("it-kamasutra.com");
  });
  test("<span> should be displayed after creation ", () => {
    const component = create(
      <ProfileStatusWithHooks
        updateStatus={updateStatus}
        status="it-kamasutra.com"
      />
    );
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("<span> with correct status should contain after creation", () => {
    const component = create(
      <ProfileStatusWithHooks
        updateStatus={updateStatus}
        status="it-kamasutra.com"
      />
    );
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("it-kamasutra.com");
  });
  test("<input> should not be displayed after creation", () => {
    const component = create(
      <ProfileStatusWithHooks
        updateStatus={updateStatus}
        status="it-kamasutra.com"
      />
    );
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });
  test("<input> should be displayed in editMode instead of <span>", () => {
    const component = create(
      <ProfileStatusWithHooks
        updateStatus={updateStatus}
        status="it-kamasutra.com"
      />
    );
    const root = component.root;
    let span = root.findByType("span");
    span.props.onClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("it-kamasutra.com");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithHooks
        status="it-kamasutra.com"
        updateStatus={mockCallback}
      />
    );
    const instance = component.getInstance() as ReactTestInstance;
    instance.props.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
