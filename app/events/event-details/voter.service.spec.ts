import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Rx';

describe('VoterService', () => {
    // Create an instance of VoterService
    // This being an isolated test, we create the 
    // instances ourselves

    // VoterService takes in http service as a parameter
    // We don't want to make real http calls during 
    // unit test so we'll it a mock HTTP service.
    let voterService: VoterService,
        mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {

        it('should remove the voter from the list of voters', () => {
            var session =  {id: 6, voters: ["joe", "john"]};

            // http.delete returns an observable
            // We are not doing anything with the return value so we
            // can just return any observable:
            mockHttp.delete.and.returnValue(Observable.of(false));
            
            voterService.deleteVoter(3, <ISession>session, 'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        });

        it('should call http.delete with the right URL', () => {
            // Arrange
            var session = { id: 6, voters: ["joe", "john"]};
            mockHttp.delete.and.returnValue(Observable.of(false));

            // Act: call the voterService.deleteVoter
            voterService.deleteVoter(3, <ISession>session, 'joe');

            // Assert
            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right url', () => {
            var session = { id: 6, voters: ["john"]};
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(3, <ISession>session, "joe");

            // Checks that the third parameter is an Object of some kind
            // not of any specific kind but just any object.  
            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', '{}', jasmine.any(Object));
        })
    });
})