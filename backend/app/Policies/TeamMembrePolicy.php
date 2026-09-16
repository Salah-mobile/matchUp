<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\TeamMember;
use App\Models\User;

class TeamMembrePolicy
{
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
    public function view(User $user, TeamMember $teamMember): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
   public function update(User $user, TeamMember $teamMember): bool
    {
        $player = $user->player;

        return $teamMember->team_id === $player->memberOfTeam->team_id
            && (
                $player->id === $teamMember->team->captain
                || $player->memberOfTeam->grade === 'second-captain'
            );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TeamMember $teamMember): bool
    {
        return $teamMember->grade==="captain" || $teamMember->grade==="second-captain";
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TeamMember $teamMember): bool
     {
        $player = $user->player;

        return $teamMember->team_id === $player->memberOfTeam->team_id
            && (
                $player->id === $teamMember->team->captain
                || $player->memberOfTeam->grade === 'second-captain'
            );
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TeamMember $teamMember): bool
    {
        return false;
    }
}
