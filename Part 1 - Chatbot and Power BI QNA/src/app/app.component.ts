import { Component, OnInit } from '@angular/core';
import {models} from 'powerbi-client';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'QNA Example';
  tokenAAD = "[AAD Token]";
  url = "https://app.powerbi.com/qnaEmbed?groups=[Group]";
  dataset = ["[Dataset ID]"];
  
  AppComponent(){
  } 

  ngOnInit(): void {
   
    var questionBoxElement = document.getElementById("QuestionBox") as HTMLInputElement;
   
    let self = this;

    questionBoxElement.addEventListener("keydown",  function(e){
      if (e.key === "Enter") {
        self.searchClicked(questionBoxElement.value);
     }
    });
   }

   searchClicked(searchString:string){
     // You can ask follow up questions

     // perform a search for the right data using other API's

     // Query some metadata

     // Return the answer via PBI
     var container = document.getElementById("PowerBIQNA");
     this.embedQna(container, searchString, this.url, this.dataset);
   }

   embedQna(container:HTMLElement, searchString:string, url:string, dataset:string[]):any{
    let config= {
      type: 'qna',
      tokenType: models.TokenType.Aad,
      accessToken: this.tokenAAD,
      embedUrl: url,
      datasetIds: dataset,
      viewMode: models.QnaMode.ResultOnly,
      question: searchString,
    };


    let pbiService = window.powerbi as pbi.service.Service;
    
    let qnaEmbed = pbiService.embed(container, config);
    let self = this;

    qnaEmbed.off("visualRendered");
    qnaEmbed.on("visualRendered", function(event) {
        // Question has been loaded 
        // do some other stuff
    });
   }

}
