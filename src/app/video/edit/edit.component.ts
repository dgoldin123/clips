import { Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();

  showAlert: boolean = false;
  alertMsg: string = 'Your Clip Is Being Updated';
  alertColor: string = 'blue';
  inSubmission: boolean = false;
    
  clipID = new FormControl('');
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  });

  constructor(private modal: ModalService, private clipService: ClipService) { }
  
  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip){
      return 
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  async submit(){
    if (!this.activeClip){
      return
    }
    this.showAlert = true;
    this.alertMsg = 'Your Clip Is Being Updated';
    this.alertColor = 'blue';
    this.inSubmission = true;
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    }
    catch(e){
      this.showAlert = true;
      this.alertMsg = 'Error With Update';
      this.alertColor = 'red';
      this.inSubmission = false;
      return
    }
    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success Clip Update';
  }

}
