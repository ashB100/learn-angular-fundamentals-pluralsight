import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { DurationPipe } from '../shared/duration.pipe';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';

describe('', () => {
    // This is the wrapper around the native element that
    // gives us some functionality that isn't available on
    // the underlying native element. 

    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: 'Joe' }
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                UpvoteComponent,
                CollapsibleWellComponent,
                DurationPipe
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ],
            schemas: []
        }).compileComponents();
        // compileComponents doesn't need to be called
        // when using WebPack
    }));

   beforeEach(() => {
       fixture = TestBed.createComponent(SessionListComponent);
       component = fixture.componentInstance;
       debugEl = fixture.debugElement;
       element = fixture.nativeElement;
   });

   // Test if the initial bindings are correct
   describe('initial display', () => {

    it('should have the correct session title', () => {
        // Arrange
        // We'll create a session that has all the session
        // properties as everything gets displayed on the template
        component.sessions = [
        {
            id: 3, 
            name: 'Session 1', 
            presenter: 'Joe',
            duration: 1,
            level: 'beginner', 
            abstract: 'absract',
            voters: ['john', 'bob']
        }];
        component.filterBy = 'all';
        component.sortBy = 'name';
        component.eventId = 4;

        // Action
        // The state change happens in the ngOnChanges() event
        // ngOnChange() fires whenever one of the input properties
        // change. But the change has to happen in the parent 
        // component. So we have to manually call it:
        component.ngOnChanges();

        // Now component.visibleSessions has the above session.
        // We want Angular to update the HTML and update the bindings
        // We do that with a call to detectChanges on the fixture.
        // What this does it run through the change detection cycle
        // taking every value the component has then re-render all 
        // those changes to HTML. So Angular will render those changes
        // for us, we can now set expectations.
        fixture.detectChanges();

        // Assert
        // What we're looking for is whether our session title is 
        // correct. So we want to ask the nativeElement which is 
        // going to be the wrapping element. This element is a 
        // handle to the root level DOM node, what we want is the 
        // div the session name is in, with an attribute of well-title. 
        
        // We use toContain() rather than toBe() because the textContent
        // may have more text than just the binding. Makes our test 
        // a less brittle. 
        
        /*expect(element.querySelector('[well-title]').textContent)
            .toContain('Session 1'); */

        // Using debugElement instead
        expect(debugEl.query(By.css('[well-title]'))
        .nativeElement
        .textContent)
        .toContain('Session 1');
    })
   })
});
