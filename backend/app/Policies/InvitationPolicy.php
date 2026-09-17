<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Invitation;
use App\Models\User;

class InvitationPolicy
{

    public function createTeamInvitation(User $user, int $teamId): bool
    {
        $player = $user->player;

        if (!$player) {
            return false;
        }

        return $player->memberOfteam()
            ->where('team_id', $teamId)
            ->whereIn('grade', ['captain', 'second-captain'])
            ->exists();
    }

    public function createJoinRequest(User $user): bool
    {
        $player = $user->player;

        if (!$player) {
            return false;
        }

        return !$player->memberOfteam()->exists();
    }

    public function accept(User $user, Invitation $invitation): bool
    {
        $player = $user->player;

        if (!$player) {
            return false;
        }
        if ($invitation->type === 'team_invitation') {
            return $invitation->player_id === $player->id;
        }
        if ($invitation->type === 'join_request') {
            return $invitation->team
                ->members()
                ->where('player_id', $player->id)
                ->whereIn('grade', ['captain', 'second-captain'])
                ->exists();
        }

        return false;
    }

    public function reject(User $user, Invitation $invitation): bool
    {
        return $this->accept($user, $invitation);
    }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Invitation $invitation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Invitation $invitation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Invitation $invitation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Invitation $invitation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Invitation $invitation): bool
    {
        return false;
    }
}
