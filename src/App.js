import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { jsPDF } from 'jspdf';

class MyGrid extends React.Component {
  constructor(props) {
    super(props);
    const savedLayout = JSON.parse(localStorage.getItem('savedLayout')) || [];
    this.state = {
      layout: savedLayout,
      newCounter: savedLayout.length,
    };
  }

  onDrop = (layout, item) => {
    this.setState({ layout });
  };

  handleDragStart = (e, type) => {
    e.dataTransfer.setData('text/plain', type);
  };

  saveLayout = () => {
    const { layout } = this.state;
    localStorage.setItem('savedLayout', JSON.stringify(layout));
  };

  loadLayout = () => {
    const savedLayout = JSON.parse(localStorage.getItem('savedLayout')) || [];
    this.setState({ layout: savedLayout, newCounter: savedLayout.length });
  };

  exportToPDF = () => {
    const { layout } = this.state;
    const doc = new jsPDF();

    doc.text("Grid Layout", 10, 10);
    doc.text(JSON.stringify(layout), 10, 20);

    doc.save("layout.pdf");
  };

  handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfContent = event.target.result;
        const jsonStart = pdfContent.indexOf("{");
        const jsonEnd = pdfContent.lastIndexOf("}") + 1;
        const jsonString = pdfContent.substring(jsonStart, jsonEnd);
        try {
          const parsedLayout = JSON.parse(jsonString);
          this.setState({ layout: parsedLayout, newCounter: parsedLayout.length });
        } catch (error) {
          console.error("Error parsing PDF layout data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  render() {
    const { layout, newCounter } = this.state;

    const droppingItem = {
      i: `new-${newCounter}`,
      w: 3,
      h: 2,
    };

    return (
      <div style={{ display: 'flex' }}>
        {/* Side panel with templates to drag */}
        <div style={{ width: '200px', padding: '10px', border: '1px solid black' }}>
          <div
            className="toolbox-item"
            draggable
            onDragStart={(e) => this.handleDragStart(e, 'body')}
            style={{ padding: '10px', cursor: 'grab', backgroundColor: '#f0f0f0', marginBottom: '10px' }}
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc.</p>
          </div>
          <div
            className="toolbox-item"
            draggable
            onDragStart={(e) => this.handleDragStart(e, 'title')}
            style={{ padding: '10px', cursor: 'grab', backgroundColor: '#f0f0f0', marginBottom: '10px' }}
          >
            <h1>Title Example</h1>
          </div>
          <button onClick={this.saveLayout} style={{ marginTop: '10px' }}>Save Layout</button>
          <button onClick={this.loadLayout} style={{ marginTop: '10px' }}>Load Layout</button>
          <button onClick={this.exportToPDF} style={{ marginTop: '10px' }}>Export to PDF</button>
          <input type="file" onChange={this.handleFileUpload} style={{ marginTop: '10px' }} />
        </div>

        {/* Grid layout */}
        <div style={{ flex: 1, position: 'relative' }}>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1000}
            droppingItem={droppingItem}
            isDroppable={true}
            onDrop={(layout, item) => {
              const type = item.i.split('-')[0];
              const newItem = { ...item };
              if (type === 'title') {
                newItem.w = 6; // Titles might be wider
                newItem.h = 2;
                newItem.type = 'title';
              } else if (type === 'body') {
                newItem.w = 3;
                newItem.h = 4;
                newItem.type = 'body';
              }
              this.setState({
                layout: [...layout.filter((l) => l.i !== item.i), newItem],
                newCounter: newCounter + 1,
              });
            }}
            measureBeforeMount={false}
            useCSSTransforms={true}
            compactType="vertical"
            preventCollision={true} // Prevent overlapping
          >
            {layout.map((item) => (
              <div key={item.i} data-grid={item} style={{ backgroundColor: '#ddd', border: '1px solid #ccc', padding: '10px' }}>
                {item.type === 'title' ? <h1>Title Example</h1> : <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc.</p>}
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    );
  }
}

export default MyGrid;
