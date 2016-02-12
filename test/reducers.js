import expect from 'expect'
import { groupForEdit } from '../src/client/app/reducers'
import * as ActionTypes from '../src/client/app/actions'

describe('groups for edit reducer', () => {
  it('should return the initial state', () => {
    expect(
      groupForEdit(undefined, {})
    ).toEqual(null)
  })


  it('should handle GROUP_CHANGED', () => {
    expect(
      groupForEdit([], {
        type: ActionTypes.GROUP_CHANGED,
        group: {
          name: 'test name'
        }
      })
    ).toEqual({
        name: 'test name'
      })
  });
});
