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
  tokenAAD = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjdfWnVmMXR2a3dMeFlhSFMzcTZsVWpVWUlHdyIsImtpZCI6IjdfWnVmMXR2a3dMeFlhSFMzcTZsVWpVWUlHdyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTUzNDM4MDM2NCwibmJmIjoxNTM0MzgwMzY0LCJleHAiOjE1MzQzODQyNjQsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84SUFBQUFZam1HdFMyWXVWdDNkWFVScm1xVER0N3dVck5wNEthL2xWeWRCRVNFSWppSGV3QjNwL2ZHK0dLalloSFpubnRvVmtXMFd2V0ZOVTdHbjNQUzJSb2FVT2k0KzdSSnJ5cGZtNXVkQnE1dmZJdz0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZGV2aWNlaWQiOiI0YTZlNDBmNS1hODI2LTRmMTktOGRlMy1hOGM0Y2NjOTJjYzIiLCJlX2V4cCI6MjYyODAwLCJmYW1pbHlfbmFtZSI6IkFsaSAoTU9IQUFMSSkiLCJnaXZlbl9uYW1lIjoiTW9oYW1tYWQiLCJpcGFkZHIiOiI4Mi4xMy41Mi42NiIsIm5hbWUiOiJNb2hhbW1hZCBBbGkgKE1PSEFBTEkpIiwib2lkIjoiMGY0OWYwOWItNWMxYi00Njk1LTg5NzMtYTQzNWZiOTVhYThhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIxMjc1MjExODQtMTYwNDAxMjkyMC0xODg3OTI3NTI3LTE3NDkzNjczIiwicHVpZCI6IjEwMDMzRkZGODBCMjEzMDYiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJwMFBjRmpLNXJYTW5CMEUxUDNPWEdZM1Z3YzVDTktyUDEzcEpaZk90RC13IiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidW5pcXVlX25hbWUiOiJtb2hhYWxpQG1pY3Jvc29mdC5jb20iLCJ1cG4iOiJtb2hhYWxpQG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJNc0JnU1VvR3RFeTBVeXFjWm53V0FBIiwidmVyIjoiMS4wIn0.cMyTLbJGfWh5UYKIeNhlxpEHwS0cCwt2xm3Wlp7en9oV1I7PPtyZwPJmMynAGgvspzw2s2-A-L1WjCjycmuH_1lnPjVHodlAyHokx--JbtKXWiPf8vJJ1LQ2nEzLECDPErac0sNtxgDBozXwyVFrXdwcjoSFNuUpixetssJGSUlSQip8dtEBRaDMZi3WdQutCelEmfsnR1UwFdAdXXwffFVFc1VOD5S3W3Ono1bD3XgujgFbeqa854Ap1XdqWYqnv89VEjX4R-PHCttlwy6fD4pL32wtL-RZ1-8Z3jq_VfKSwzT_gO-9pl3K-A2tyhBLhuJWRDo7Eas5oJtZE481lA";
  url = "https://app.powerbi.com/qnaEmbed?groups=a141cee4-0e3f-431b-86b9-645069f6a222";
  dataset = ["3cc18f83-3436-4938-9811-80e653e85b60"];
  
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
