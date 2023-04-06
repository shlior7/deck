import Card from "../Cards/Card"
import { DraggableTable } from "./DragableTable"
import { ZoomableTable } from "./ZoomableTable"

export const TableWrapper = () => {
  return (
    <DraggableTable>
      <ZoomableTable><Card /></ZoomableTable>
    </DraggableTable>
  )
}
