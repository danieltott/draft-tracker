import { all } from 'redux-saga/effects'
// import { put, takeEvery, all, select } from 'redux-saga/effects'
// import * as types from './types'
// import * as selectors from './selectors'
// import * as actions from './actions'

// function* watchUpdateItemsEnabled() {
//   yield takeEvery([types.SELECT_OPTION, types.SELECT_OPTION_INIT], function*(
//     action
//   ) {
//     const payloadContainer = action.payload.container

//     const payloadOptionGroup = action.payload.optionGroup

//     const optionGroups = yield select(selectors.getOptionGroups)

//     const allSelectedOptions = yield select(selectors.getAllSelectedOptions, {
//       containerKey: payloadContainer.id,
//     })

//     const containerItems = yield select(selectors.getContainerItems, {
//       containerKey: payloadContainer.id,
//     })

//     const filteredOptionGroups = payloadContainer.optionGroups.filter(
//       groupId => groupId !== payloadOptionGroup.id
//     )

//     for (let groupId of filteredOptionGroups) {
//       const availableOptions = optionGroups[
//         groupId
//       ].options.filter(optionId => {
//         const filteredSelectedOptions = [
//           ...allSelectedOptions.filter(xoption => xoption.key !== groupId),
//           {
//             key: groupId,
//             value: optionId,
//           },
//         ]

//         return (
//           containerItems.filter(item =>
//             filteredSelectedOptions.reduce((acc, yoption) => {
//               return acc && item.options[yoption.key] === yoption.value
//             }, true)
//           ).length > 0
//         )
//       })

//       yield put(actions.setItemsEnabled(groupId, availableOptions))
//     }

//     const selectableItems = yield select(selectors.getSelectableItems, {
//       containerKey: payloadContainer.id,
//     })
//     if (action.type === types.SELECT_OPTION && selectableItems.length === 1) {
//       yield put(actions.selectItem(payloadContainer, selectableItems[0]))
//     }
//   })
// }

// function* watchClearOptions() {
//   yield takeEvery(types.CLEAR_SELECTED_OPTIONS, function*(action) {
//     const { container } = action.payload

//     for (let groupId of container.optionGroups) {
//       yield put(actions.clearSelectedOption(groupId))
//     }
//     // clearSelectedOption
//   })
// }

// function* watchInit() {
//   yield takeEvery(types.INIT, function*(action) {
//     const { container, selectedItem } = action.payload

//     const optionGroups = yield select(selectors.getOptionGroups)

//     const options = yield select(selectors.getOptions)

//     if (selectedItem) {
//       for (let groupId of container.optionGroups) {
//         yield put(
//           actions.selectOptionInit(
//             container,
//             options[selectedItem.options[groupId]],
//             optionGroups[groupId]
//           )
//         )
//       }
//     }
//   })
// }

export default function* TeamsSaga() {
  yield all(
    [
      //watchInit(), watchUpdateItemsEnabled(), watchClearOptions()
    ]
  )
}
