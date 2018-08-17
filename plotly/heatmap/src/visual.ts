/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;
        dataTable: DataTable;

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
           
            if (typeof document !== "undefined") {
            }
            this.dataTable = new DataTable();
            
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            
            // reset the element
            while (this.target.childNodes.length >= 1) {
                this.target.removeChild(this.target.childNodes[0]);
            }

            let canvas = this.target.appendChild(document.createElement('div'));
            
            // replot
            this.dataTable.update(options.dataViews[0]);
            let datax = this.dataTable.getColumn(0);
            let datay = this.dataTable.getColumn(1);
            this.generatePlotlyVisual(canvas, datax, datay);
            
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }

        public generatePlotlyVisual(canvas, datax, datay){
            {
                var trace1 = {
                  x: datax,
                  y: datay,
                  mode: 'markers',
                  type: 'scatter',
                  marker: {
                    color: 'rgb(58,72,74)'
                  }
                };
          
                var data = [trace1];
          
                Plotly.plot(
                  canvas , 
                  data, 
                  { margin: { t: 0 }, paper_bgcolor: 'rgba(0,0,0,0)',  plot_bgcolor: 'rgba(0,0,0,0)'}, 
                  {displayModeBar: false,} 
                );
              }
        }
        
    }

    export class DataTable{
    
        public data:Array<DataViewTableRow>;
        public columns:Array<DataViewMetadataColumn>;
        public columnNames:Array<string>;
    
        public update(dataview:DataView): any {
          this.data = dataview.table.rows;
          this.columns = dataview.table.columns;
          this.columnNames = new Array<string>();   
    
          for(let i=0; i < this.columns.length; i++)
          {
            let item = this.columns[i];
            if(item.displayName == null || item.displayName == "")
            {
              this.columnNames.push((item.identityExprs[0] as any).ref);
            }
            else
            {
              this.columnNames.push(item.displayName);
            }
          }
        }

        public getColumn(columnIndex:number): any[]{
            let arr = new Array;
            for(let i=0 ; i<this.data.length; i++)
            {
              arr.push(this.data[i][columnIndex]);
            }
            return arr;
        }
    }
}