import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { AddGroupPage } from '../src/client/app/containers/AddGroupPage'

function setup() {
  function addGroup () {
    return new Promise((resolve) => {
      addGroup.spy();
      resolve();
    });
  }
  addGroup.spy = expect.createSpy();

  let props = {
    group: {
      name: 'test group'
    },
    changeGroup: expect.createSpy(),
    addGroup: addGroup,
    createEmptyGroup: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<AddGroupPage {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('EditGroupForm', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.type).toBe('div');
      expect(output.props.children[0].type).toBe('h4');
    })
  })

  it('should call addGroup if save called', () => {
    const { output, props } = setup()
    let groupForm = output.props.children[1].props.children.props.children;
    groupForm.props.save({
      name: 'test'
    })
    expect(props.addGroup.spy.calls.length).toBe(1);
  })
})
