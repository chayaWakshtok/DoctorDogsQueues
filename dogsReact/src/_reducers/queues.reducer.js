import { queueConstants } from '../_constants';

export function queues(state = {}, action) {
  switch (action.type) {
    case queueConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case queueConstants.GETALL_SUCCESS:
      return {
        items: action.queues
      };
    case queueConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case queueConstants.DELETE_REQUEST:
      // add 'deleting:true' property to queue being deleted
      return {
        ...state,
        items: state.items.map(queue =>
          queue.id === action.id
            ? { ...queue, deleting: true }
            : queue
        )
      };
    case queueConstants.DELETE_SUCCESS:
      // remove deleted queue from state
      return {
        items: state.items.filter(queue => queue.id !== action.id)
      };
    case queueConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to queue 
      return {
        ...state,
        items: state.items.map(queue => {
          if (queue.id === action.id) {
            // make copy of queue without 'deleting:true' property
            const { deleting, ...queueCopy } = queue;
            // return copy of user with 'deleteError:[error]' property
            return { ...queueCopy, deleteError: action.error };
          }
          return queue;
        })
      };
    case queueConstants.ADD_REQUEST:
      return {
        add: true
      }
    case queueConstants.ADD_SUCCESS:
      return {
      };
    case queueConstants.ADD_FAILURE:
      return {
      };
    default:
      return state
  }
}