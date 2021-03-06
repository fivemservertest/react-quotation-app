import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalBefore, setTotalBefore] = useState(0);

  useEffect(() => {
    let sum = 0;
    let sumDisc = 0;
    let sumBefore = 0;
    const z = data.map((v, i) => {
      let amountBefore = v.qty * v.ppu;
      let amount = (v.qty * v.ppu) - (v.disc);
      let discAm = Number(v.disc);
      sum += amount;
      sumDisc += discAm
      sumBefore += amountBefore
      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style={styles.textCenter}>{v.disc}</td>
          <td style={styles.textRight}>{numberWithCommas(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(sum);
    setTotalDiscount(sumDisc);
    setTotalBefore(sumBefore);

  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Quotation</h1>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
        <tr>
            <th colSpan={3}></th>
            <th style={styles.textLeft}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(totalDiscount)}</th>
            <th style={styles.textRight}>{numberWithCommas(totalBefore)}</th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textLeft}>Total (After Discount)</th>
            <th colSpan={1}></th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
